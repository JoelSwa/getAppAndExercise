import { TestBed } from '@angular/core/testing';

import { WalkService } from './walk.service';

describe('WalkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalkService = TestBed.get(WalkService);
    expect(service).toBeTruthy();
  });
});
