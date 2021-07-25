import { TestBed } from '@angular/core/testing';

import { GreeterService } from './greeter.service';

describe('GreeterService', () => {
  let service: GreeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
