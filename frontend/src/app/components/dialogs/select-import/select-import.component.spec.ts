import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectImportComponent} from './select-import.component';

describe('SelectImportComponent', () => {
  let component: SelectImportComponent;
  let fixture: ComponentFixture<SelectImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
