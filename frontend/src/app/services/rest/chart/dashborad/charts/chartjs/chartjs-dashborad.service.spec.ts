import {TestBed} from '@angular/core/testing';

import {ChartJsDashboardService} from './chart-js-dashboard.service';

describe('ChartjsDashboradService', () => {
  let service: ChartJsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartJsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
