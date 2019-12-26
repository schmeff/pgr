import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminDataService} from "../../services/admin-data.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'pgr-add-critic-review-dialog',
    templateUrl: './add-critic-review-dialog.component.html',
    styleUrls: ['./add-critic-review-dialog.component.scss']
})
export class AddCriticReviewDialogComponent implements OnInit, OnDestroy {
    addCriticReviewForm: FormGroup = undefined;

    private $onDestroy = new Subject();

    editing: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddCriticReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private adminDataService: AdminDataService
    ) {
        this.addCriticReviewForm = this.formBuilder.group({
            name: ['', Validators.required],
            rating: ['', Validators.required],
            link: ['']
        });
    }

    ngOnInit() {
        if (this.data.review) {
            this.editing = true;
            this.addCriticReviewForm.get('name').setValue(this.data.review.name);
            this.addCriticReviewForm.get('rating').setValue(this.data.review.rating);
            this.addCriticReviewForm.get('link').setValue(this.data.review.link);
        }
    }

    ngOnDestroy(): void {
        this.$onDestroy.next();
        this.$onDestroy.complete();
    }

    close() {
        this.dialogRef.close()
    }

    save() {
        if (!this.editing) {
            this.saveReview()
                .pipe(
                    takeUntil(this.$onDestroy)
                )
                .subscribe((success: boolean) => {
                    if (success) {
                        this.dialogRef.close(success);
                    }
                });
        } else {
            this.saveReviewEdit()
                .pipe(
                    takeUntil(this.$onDestroy)
                )
                .subscribe((success: boolean) => {
                    if(success){
                        this.dialogRef.close(success);
                    }
                });
        }
    }

    saveAndAddNew() {
        this.saveReview()
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((success: boolean) => {
                if (success) {
                    this.addCriticReviewForm.reset();
                }
            });
    }

    saveReview() {
        let name = this.addCriticReviewForm.get('name').value;
        let rating = +this.addCriticReviewForm.get('rating').value;
        let link = this.addCriticReviewForm.get('link').value;

        return this.adminDataService.addCriticReview(name, rating, this.data.gameId, link);
    }

    saveReviewEdit() {
        let name = this.addCriticReviewForm.get('name').value;
        let rating = +this.addCriticReviewForm.get('rating').value;
        let link = this.addCriticReviewForm.get('link').value;
        let reviewId = this.data.review.id;

        return this.adminDataService.editCriticReview(name, rating, link, reviewId)
    }

}
