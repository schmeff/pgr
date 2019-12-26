import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriticReviewDialogComponent } from './add-critic-review-dialog.component';

describe('AddCriticReviewDialogComponent', () => {
  let component: AddCriticReviewDialogComponent;
  let fixture: ComponentFixture<AddCriticReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCriticReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriticReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
