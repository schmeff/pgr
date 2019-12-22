import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'pgr-game-cover-image-preview-dialog',
  templateUrl: './game-cover-image-preview-dialog.component.html',
  styleUrls: ['./game-cover-image-preview-dialog.component.scss']
})
export class GameCoverImagePreviewDialogComponent {
  constructor(
        public dialogRef: MatDialogRef<GameCoverImagePreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}


    onCloseClick(){
        this.dialogRef.close();
    }

}
