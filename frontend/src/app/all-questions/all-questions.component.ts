import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { QUESTION_MOCKUP } from '../interfaces_mockups';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent {
  questions: Question[] = []

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.apiService.allQuestions().subscribe(questions => this.questions = questions)
  }

  newQuestion(): void {
    const dialogRef = this.dialog.open(AddQuestionComponent, {data: QUESTION_MOCKUP});
  }
}
