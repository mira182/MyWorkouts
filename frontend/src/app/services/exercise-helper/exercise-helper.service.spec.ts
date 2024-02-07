import {TestBed} from '@angular/core/testing';

import {ExerciseHelperService} from './exercise-helper.service';

describe('ExerciseHelperService', () => {
  let service: ExerciseHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
