import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../interfaces';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent {
  questions: Question[] = []

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.apiService.allQuestions().subscribe(questions => this.questions = questions)
  }
}
