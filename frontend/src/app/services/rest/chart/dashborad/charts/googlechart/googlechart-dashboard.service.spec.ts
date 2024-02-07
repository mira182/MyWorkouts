import {TestBed} from '@angular/core/testing';

import {GooglechartDashboardService} from './googlechart-dashboard.service';

describe('DashboardService', () => {
  let service: GooglechartDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglechartDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
