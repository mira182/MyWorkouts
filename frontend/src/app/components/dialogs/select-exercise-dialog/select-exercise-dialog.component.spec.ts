import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectExerciseDialogComponent} from './select-exercise-dialog.component';

describe('SelectExerciseDialogComponent', () => {
  let component: SelectExerciseDialogComponent;
  let fixture: ComponentFixture<SelectExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
