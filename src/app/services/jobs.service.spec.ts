import { TestBed, inject } from '@angular/core/testing';

import { JobsApiService } from './jobs.service';

describe('JobsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobsApiService]
    });
  });

  it('should be created', inject([JobsApiService], (service: JobsApiService) => {
    expect(service).toBeTruthy();
  }));
});
