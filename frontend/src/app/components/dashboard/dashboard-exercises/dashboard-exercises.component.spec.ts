import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardExercisesComponent} from './dashboard-exercises.component';

describe('DashboardExercisesComponent', () => {
  let component: DashboardExercisesComponent;
  let fixture: ComponentFixture<DashboardExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
