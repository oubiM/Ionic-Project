import { TestBed } from '@angular/core/testing';

import { DataTripService } from './data-trip.service';

describe('DataTripService', () => {
  let service: DataTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
