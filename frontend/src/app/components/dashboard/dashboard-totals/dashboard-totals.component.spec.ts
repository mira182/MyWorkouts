import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardTotalsComponent} from './dashboard-totals.component';

describe('DashboardTotalsComponent', () => {
  let component: DashboardTotalsComponent;
  let fixture: ComponentFixture<DashboardTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
