from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from couchdb import *
import random
import time

class Question(BaseModel):
    id: str
    type: str
    author: str
    content: str
    used: int

app = FastAPI()
url = 'http://admin:YOURPASSWORD@db:8088/'

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://127.0.0.1:4200/submit-question",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def connect_with_retry(url, retries=5, delay=3):
    for i in range(retries):
        try:
            server = Server(url)
            # Prüfe Verbindung zur _users-DB
            server['_users'].info()
            return server
        except (http.ServerError, ConnectionError) as e:
            if i == retries - 1:
                raise
            print(f"Verbindungsfehler ({e}), neuer Versuch in {delay}s...")
            time.sleep(delay)



def getDB():
    server = connect_with_retry("http://admin:YOURPASSWORD@db:5984/")
    if 'top10' not in server:
        server.create('top10')
    return server['top10']


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/get-question")
async def getQuestion():
    db = getDB()
    questions = []
    sample = random.sample(range(len(db)), 4)
    for i,id in enumerate(db):
        if i in sample:
            doc = db[id]
            questions.append({
                'id':id, 
                'type':doc['type'],
                'author':doc['author'],
                'content':doc['content'],
                'used':doc['used']
            })
            doc['used'] = doc['used'] + 1
            db.update([doc])

    random.shuffle(questions)
    return questions


@app.post("/submit-question")
async def submitQuestion(question: Question):
    db = getDB()
    if question.content == '':
        return {"status": "nicht gespeichert"}
    elif question.author == '':
        question.author = 'anonym'
    elif question.id != '':
        doc = db[question.id]
        doc['author'] = question.author
        doc['content'] = question.content
        db[question.id] = doc
        return {"status": "Frage geupdated"}
    db.save({
        'type': question.type,
        'author': question.author,
        'content': question.content,
        'used': question.used,
    })
    return {"status": "Frage Gespeichert"}


@app.get("/all-questions")
async def allQuestions():
    db = getDB()
    questions = []
    for id in db:
        doc = db[id]
        questions.append({
            'id':id, 
            'type':doc['type'],
            'author':doc['author'],
            'content':doc['content'],
            'used':doc['used'],
        })
    return questions


@app.post("/remove-question")
async def removeQuestion(question: Question):
    print(question.content)
    db = getDB()
    del db[question.id]
    return {"status": "erfolgreich gelöscht"}