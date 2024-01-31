import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WithingsWeightComponent} from './withings-weight.component';

describe('WithingsWeightComponent', () => {
  let component: WithingsWeightComponent;
  let fixture: ComponentFixture<WithingsWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithingsWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithingsWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
