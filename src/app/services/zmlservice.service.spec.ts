import { TestBed } from '@angular/core/testing';

import { ZmlserviceService } from './zmlservice.service';

describe('ZmlserviceService', () => {
  let service: ZmlserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZmlserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
