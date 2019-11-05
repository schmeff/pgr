import { TestBed, async, inject } from '@angular/core/testing';

import { CanEditProfileGuard } from './can-edit-profile.guard';

describe('CanEditProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanEditProfileGuard]
    });
  });

  it('should ...', inject([CanEditProfileGuard], (guard: CanEditProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
