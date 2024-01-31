import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RepsExerciseComponent} from './reps-exercise.component';

describe('RepsExerciseComponent', () => {
  let component: RepsExerciseComponent;
  let fixture: ComponentFixture<RepsExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepsExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
