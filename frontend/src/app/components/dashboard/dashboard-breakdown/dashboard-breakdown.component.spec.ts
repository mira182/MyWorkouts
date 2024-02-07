import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardBreakdownComponent} from './dashboard-breakdown.component';

describe('DashboardBreakdownComponent', () => {
  let component: DashboardBreakdownComponent;
  let fixture: ComponentFixture<DashboardBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
