import { TestBed } from '@angular/core/testing';

import { GeofenceInstanceService } from './geofence-instance.service';

describe('GeofenceInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeofenceInstanceService = TestBed.get(GeofenceInstanceService);
    expect(service).toBeTruthy();
  });
});
