import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WeightRepsExerciseComponent} from './weight-reps-exercise.component';

describe('WeightRepsExerciseComponent', () => {
  let component: WeightRepsExerciseComponent;
  let fixture: ComponentFixture<WeightRepsExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightRepsExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightRepsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
