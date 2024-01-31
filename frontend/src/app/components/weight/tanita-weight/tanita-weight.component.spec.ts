import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TanitaWeightComponent} from './tanita-weight.component';

describe('TanitaWeightComponent', () => {
  let component: TanitaWeightComponent;
  let fixture: ComponentFixture<TanitaWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TanitaWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TanitaWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
