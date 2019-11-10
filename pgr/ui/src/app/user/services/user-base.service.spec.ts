import { TestBed } from '@angular/core/testing';

import { UserBaseService } from './user-base.service';

describe('UserBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBaseService = TestBed.get(UserBaseService);
    expect(service).toBeTruthy();
  });
});
