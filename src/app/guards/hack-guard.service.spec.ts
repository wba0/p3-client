import { TestBed, inject } from '@angular/core/testing';

import { HackGuardService } from './hack-guard.service';

describe('HackGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackGuardService]
    });
  });

  it('should be created', inject([HackGuardService], (service: HackGuardService) => {
    expect(service).toBeTruthy();
  }));
});
