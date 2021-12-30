import { TestBed } from '@angular/core/testing';

import { DataCountryService } from './data-country.service';

describe('DataCountryService', () => {
  let service: DataCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
