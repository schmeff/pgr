import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCoverImagePreviewDialogComponent } from './game-cover-image-preview-dialog.component';

describe('GameCoverImagePreviewDialogComponent', () => {
  let component: GameCoverImagePreviewDialogComponent;
  let fixture: ComponentFixture<GameCoverImagePreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCoverImagePreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCoverImagePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
