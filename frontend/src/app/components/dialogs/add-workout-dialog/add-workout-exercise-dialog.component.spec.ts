import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddWorkoutExerciseDialogComponent} from './add-workout-exercise-dialog.component';

describe('AddWorkoutDialogComponent', () => {
  let component: AddWorkoutExerciseDialogComponent;
  let fixture: ComponentFixture<AddWorkoutExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkoutExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
