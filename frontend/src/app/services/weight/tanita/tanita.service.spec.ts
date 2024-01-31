import {TestBed} from '@angular/core/testing';

import {TanitaService} from './tanita.service';

describe('WeightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TanitaService = TestBed.get(TanitaService);
    expect(service).toBeTruthy();
  });
});
