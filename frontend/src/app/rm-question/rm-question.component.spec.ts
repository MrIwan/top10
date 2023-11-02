import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmQuestionComponent } from './rm-question.component';

describe('RmQuestionComponent', () => {
  let component: RmQuestionComponent;
  let fixture: ComponentFixture<RmQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmQuestionComponent]
    });
    fixture = TestBed.createComponent(RmQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
