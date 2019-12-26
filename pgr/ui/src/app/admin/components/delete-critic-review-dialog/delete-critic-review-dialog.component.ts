import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AdminDataService} from "../../services/admin-data.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'pgr-delete-critic-review-dialog',
    templateUrl: './delete-critic-review-dialog.component.html',
    styleUrls: ['./delete-critic-review-dialog.component.scss']
})
export class DeleteCriticReviewDialogComponent implements OnInit {
    private $onDestroy = new Subject();

    constructor(
        public dialogRef: MatDialogRef<DeleteCriticReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private adminDataService: AdminDataService
    ) {
    }

    ngOnInit() {
    }

    deleteCriticReview() {
        this.adminDataService.deleteCriticReview(this.data.id)
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((success: boolean) => {
                if(success){
                    this.dialogRef.close(success);
                }
            });
    }

    close(){
        this.dialogRef.close();
    }

}
