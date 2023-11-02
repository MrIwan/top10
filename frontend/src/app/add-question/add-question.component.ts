import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../interfaces';
import { QUESTION_MOCKUP } from '../interfaces_mockups';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  question: Question = QUESTION_MOCKUP;

  constructor(private apiService: ApiService) {

  }

  submitQuestion() {
    this.apiService.submitQuestion(this.question);
    this.question.content = ''
  }

  onEnter() {
    console.log(this.question)
  }
}
