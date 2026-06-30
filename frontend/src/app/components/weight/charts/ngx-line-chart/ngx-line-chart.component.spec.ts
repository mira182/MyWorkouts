import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLineChartComponent } from './ngx-line-chart.component';

describe('NgxChartComponent', () => {
  let component: NgxLineChartComponent;
  let fixture: ComponentFixture<NgxLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
