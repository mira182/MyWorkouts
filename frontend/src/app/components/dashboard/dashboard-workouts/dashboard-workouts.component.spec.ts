import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardWorkoutsComponent} from './dashboard-workouts.component';

describe('DashboardWorkoutsComponent', () => {
  let component: DashboardWorkoutsComponent;
  let fixture: ComponentFixture<DashboardWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
