import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainGameComponent } from './main-game/main-game.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'main-game', component: MainGameComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'all-questions', component: AllQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}