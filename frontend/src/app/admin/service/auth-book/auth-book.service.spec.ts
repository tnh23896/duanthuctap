import { TestBed } from '@angular/core/testing';

import { AuthBookService } from './auth-book.service';

describe('AuthBookService', () => {
  let service: AuthBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
