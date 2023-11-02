import { Component, Inject } from '@angular/core';
import { Question } from '../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-rm-question',
  templateUrl: './rm-question.component.html',
  styleUrls: ['./rm-question.component.css']
})
export class RmQuestionComponent {

  constructor(
    private dialogRef: MatDialogRef<RmQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private q: Question,
    private apiService: ApiService,
  ) {}

  remove() {
    this.apiService.removeQuestion(this.q);
    this.dialogRef.close();
  }
}
