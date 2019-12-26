import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticReviewsTableComponent } from './critic-reviews-table.component';

describe('CriticReviewsTableComponent', () => {
  let component: CriticReviewsTableComponent;
  let fixture: ComponentFixture<CriticReviewsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticReviewsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticReviewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
