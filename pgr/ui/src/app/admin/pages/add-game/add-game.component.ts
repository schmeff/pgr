import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'pgr-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
    parentalRatings = [
        "Everyone",
        "Teen",
        "Mature"
    ];

    addGameForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        summary: new FormControl(''),
        publisher: new FormControl(''),
        parentalRating: new FormControl(''),
        releaseDate: new FormControl('')
    });

    constructor(
        private adminService: AdminService,
        private snackBar: MatSnackBar,
        private el: ElementRef
    ) {
    }

    ngOnInit() {
        this.el.nativeElement.querySelectorAll('.game-name')[0].focus();
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
            this.addGameForm.controls["publisher"].value,
            this.addGameForm.controls["parentalRating"].value,
            this.formatDate(this.addGameForm.controls["releaseDate"].value),
            null
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
        this.addGameForm.controls["publisher"].setValue("");
        this.addGameForm.controls["parentalRating"].setValue("");
        this.addGameForm.controls["releaseDate"].setValue("");
        this.el.nativeElement.querySelectorAll('.game-name')[0].focus();
    }

}
