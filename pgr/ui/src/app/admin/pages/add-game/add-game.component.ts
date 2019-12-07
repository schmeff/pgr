import {Component, ElementRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'pgr-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit, OnDestroy {
    parentalRatings = [
        "Everyone",
        "Teen",
        "Mature"
    ];

    addGameForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        summary: new FormControl(''),
        developer: new FormControl(''),
        parentalRating: new FormControl(''),
        releaseDate: new FormControl('')
    });

    coverImageURLBS = new BehaviorSubject(undefined);
    coverImageURL$ = this.coverImageURLBS.asObservable();

    coverImageURL: string = null;

    private $ngDestroy = new Subject();

    constructor(
        private adminService: AdminService,
        private snackBar: MatSnackBar,
        private el: ElementRef,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.el.nativeElement.querySelectorAll('.game-name')[0].focus();

        this.coverImageURL$
            .pipe(
                takeUntil(this.$ngDestroy)
            )
            .subscribe((imageURL: string)=>{
                this.coverImageURL = imageURL;
            })
    }

    ngOnDestroy(): void {
        this.$ngDestroy.next();
        this.$ngDestroy.complete();
    }

    addGame() {
        if (!this.addGameForm.valid) {
            this.snackBar.open("Please fix form errors", "Close", {duration: 2000});
            return;
        }

        this.snackBar.open("Adding game...");

        this.adminService.addGame(
            this.addGameForm.controls["name"].value,
            this.addGameForm.controls["summary"].value,
            this.addGameForm.controls["developer"].value,
            this.addGameForm.controls["parentalRating"].value,
            this.formatDate(this.addGameForm.controls["releaseDate"].value),
            this.coverImageURL
        )
            .subscribe((response: any) => {
                    if (response.data.addGame.success) {
                        this.snackBar.open("Game was successfully added!", "Close", {duration: 2000});
                        this.resetForm();
                    }
                },
                (err) => {
                    if (err.graphQLErrors[0]) {
                        this.snackBar.open(err.graphQLErrors[0].message, "Close", {duration: 2000});
                    }
                });
    }

    private formatDate(date) {
        if (date) {
            let year = date.getUTCFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            return `${year}-${month}-${day}`;
        }
        return date;
    }

    private resetForm() {
        this.addGameForm.controls["name"].markAsUntouched();
        this.addGameForm.controls["name"].setValue("");
        this.addGameForm.controls["summary"].setValue("");
        this.addGameForm.controls["developer"].setValue("");
        this.addGameForm.controls["parentalRating"].setValue("");
        this.addGameForm.controls["releaseDate"].setValue("");
        this.el.nativeElement.querySelectorAll('.game-name')[0].focus();
    }

    setGameCoverImage(event) {
        let file = null;
        if (event.target.files[0]){
            file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.coverImageURLBS.next(reader.result);
            }
        }
    }

    openImageCoverPreview(){
        this.dialog.open(CoverImagePreviewDialog, {
            width: '960px',
            data: {imageURL: this.coverImageURL}
        });
    }

}

@Component({
    selector: 'cover-image-preview-dialog',
    templateUrl: 'cover-image-preview-dialog.html',
    styles: [
        '.cover-image-preview{ width: 100%; height: 100%;}'
    ]
})
export class CoverImagePreviewDialog {
    constructor(
        public dialogRef: MatDialogRef<CoverImagePreviewDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}


    onCloseClick(){
        this.dialogRef.close();
    }
}
