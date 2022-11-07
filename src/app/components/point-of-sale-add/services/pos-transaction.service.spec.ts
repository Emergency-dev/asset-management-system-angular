import { TestBed } from '@angular/core/testing';

import { PosTransactionService } from './pos-transaction.service';

describe('PosTransactionService', () => {
  let service: PosTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
