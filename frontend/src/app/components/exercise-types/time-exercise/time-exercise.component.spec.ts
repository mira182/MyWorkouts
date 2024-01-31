import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeExerciseComponent} from './time-exercise.component';

describe('TimeExerciseComponent', () => {
  let component: TimeExerciseComponent;
  let fixture: ComponentFixture<TimeExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
