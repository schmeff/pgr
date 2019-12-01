import { TestBed, async, inject } from '@angular/core/testing';

import { AdminViewGuard } from './admin-view.guard';

describe('AdminViewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminViewGuard]
    });
  });

  it('should ...', inject([AdminViewGuard], (guard: AdminViewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
