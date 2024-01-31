import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkoutsHandlerComponent} from './workouts-handler.component';

describe('WorkoutsHandlerComponent', () => {
  let component: WorkoutsHandlerComponent;
  let fixture: ComponentFixture<WorkoutsHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutsHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
