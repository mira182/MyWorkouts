import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkoutExerciseComponent} from './workout-exercise.component';

describe('WorkoutExerciseComponent', () => {
  let component: WorkoutExerciseComponent;
  let fixture: ComponentFixture<WorkoutExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
