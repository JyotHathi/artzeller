import { TestBed } from '@angular/core/testing';

import { RazorpayService } from './razor-pay.service';

describe('RazorPayService', () => {
  let service: RazorpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
