import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WeekDatePickerComponent} from './week-date-picker.component';

describe('WeekDatePickerComponent', () => {
  let component: WeekDatePickerComponent;
  let fixture: ComponentFixture<WeekDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
