import { TestBed } from '@angular/core/testing';

import { AddTruckService } from './add-truck.service';

describe('AddTruckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddTruckService = TestBed.get(AddTruckService);
    expect(service).toBeTruthy();
  });
});
