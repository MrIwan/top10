from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from couchdb import *
import random

class Question(BaseModel):
    id: str
    type: str
    author: str
    content: str
    used: int

app = FastAPI()
url = 'http://admin:YOURPASSWORD@terra:8088/'

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

def getDB():
    server = Server(url)
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