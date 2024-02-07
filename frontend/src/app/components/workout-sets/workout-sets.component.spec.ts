import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkoutSetsComponent} from './workout-sets.component';

describe('WorkoutSetsComponent', () => {
  let component: WorkoutSetsComponent;
  let fixture: ComponentFixture<WorkoutSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
