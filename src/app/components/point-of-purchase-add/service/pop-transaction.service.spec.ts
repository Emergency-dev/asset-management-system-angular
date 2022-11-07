import { TestBed } from '@angular/core/testing';

import { PopTransactionService } from './pop-transaction.service';

describe('PopTransactionService', () => {
  let service: PopTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
