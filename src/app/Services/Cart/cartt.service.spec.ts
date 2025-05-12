import { TestBed } from '@angular/core/testing';

import { CarttService } from './cartt.service';

describe('CarttService', () => {
  let service: CarttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
