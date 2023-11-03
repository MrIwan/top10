import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer, Question } from './interfaces';
import { Observable, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RmQuestionComponent } from './rm-question/rm-question.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url = '/api';
  url = 'http://127.0.0.1:8000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url + '/get-question')
  }

  submitQuestion(question: Question) {
    console.log(question)
    this.http.post<Answer>(this.url + '/submit-question', question, this.httpOptions)
      .subscribe(answer => this.snackBar.open(answer.status, 'schließen', {duration: 2000}));
  }

  allQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.url + '/all-questions')
  }

  removeQuestion(question: Question): void {
    this.http.post<Answer>(this.url + '/remove-question', question, this.httpOptions)
      .subscribe(answer => this.snackBar.open(answer.status, 'schließen', {duration: 2000}))
  }
}
