import { TestBed } from '@angular/core/testing';

import { AverageColorService } from './average-color.service';

describe('AverageColorService', () => {
  let service: AverageColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
