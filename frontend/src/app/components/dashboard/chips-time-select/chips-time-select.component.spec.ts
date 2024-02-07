import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChipsTimeSelectComponent} from './chips-time-select.component';

describe('ChipsTimeSelectComponent', () => {
  let component: ChipsTimeSelectComponent;
  let fixture: ComponentFixture<ChipsTimeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsTimeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsTimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
