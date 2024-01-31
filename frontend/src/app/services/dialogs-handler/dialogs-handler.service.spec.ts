import {TestBed} from '@angular/core/testing';

import {DialogsHandlerService} from './dialogs-handler.service';

describe('DialogsHandlerService', () => {
  let service: DialogsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
