import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Answer, Question } from './interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = '/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    if(isDevMode()){
      this.url = 'http://127.0.0.1:8000';
    }
  }

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
