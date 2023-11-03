import { Component, Inject, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../interfaces';
import { QUESTION_MOCKUP } from '../interfaces_mockups';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  question: Question = QUESTION_MOCKUP

  constructor(
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private q: Question,
    private apiService: ApiService,
    ) {
      if(q.content != '') {
        this.question = this.q;
      }
    }

  backBtn() {
    this.dialogRef.close();
  }

  submitQuestion(): void {
    this.apiService.submitQuestion(this.question);
    if(this.question.id != '') {
      this.dialogRef.close();
    }
    else {
      this.question.content = ''
    }
  }
}
