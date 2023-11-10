import { TestBed } from '@angular/core/testing';

import { CrudWithTokenService } from './crud-with-token.service';

describe('CrudWithTokenService', () => {
  let service: CrudWithTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWithTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
