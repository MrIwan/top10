import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QUESTION_MOCKUP } from '../interfaces_mockups';
import { Question } from '../interfaces';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { RmQuestionComponent } from '../rm-question/rm-question.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: Question = QUESTION_MOCKUP;

  @Output() selectQuestion = new EventEmitter<Question>()

  @Output() questionRemoved = new EventEmitter<Boolean>()

  constructor(
    private dialog: MatDialog) {}

  removeQuestion(): void {
    const dialogRef = this.dialog.open(RmQuestionComponent, {
      data: this.question
    })
    dialogRef.afterClosed().subscribe(result => this.questionRemoved.emit(true));
  }

  questionClick() {
    this.selectQuestion.emit(this.question);
  }
}
