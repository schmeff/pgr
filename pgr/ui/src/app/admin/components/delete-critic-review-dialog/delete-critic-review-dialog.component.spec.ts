import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCriticReviewDialogComponent } from './delete-critic-review-dialog.component';

describe('DeleteCriticReviewDialogComponent', () => {
  let component: DeleteCriticReviewDialogComponent;
  let fixture: ComponentFixture<DeleteCriticReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCriticReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCriticReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
