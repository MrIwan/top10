import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../interfaces';
import { QUESTION_MOCKUP } from '../interfaces_mockups';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent {
  questions: Question[] = []
  selected_question: Question = QUESTION_MOCKUP;

  constructor(private apiService: ApiService) {
    this.selected_question.content = 'Klicke zuerst auf eine Frage um sie auszuwählen'
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.apiService.getQuestions().subscribe(q => this.questions = q);
  }

  selectQuestion(q: Question, stepper: MatStepper) {
    this.selected_question = q;
    stepper.next();
  }

  newQuestions(stepper:MatStepper) {
    this.getQuestions()
    stepper.previous();
  }
}
