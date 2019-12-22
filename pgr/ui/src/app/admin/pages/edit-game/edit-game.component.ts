import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminDataService} from "../../services/admin-data.service";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GameCoverImagePreviewDialogComponent} from "../../components/game-cover-image-preview-dialog/game-cover-image-preview-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AdminService} from "../../services/admin.service";

@Component({
    selector: 'pgr-edit-game',
    templateUrl: './edit-game.component.html',
    styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit, OnDestroy {
    parentalRatings: String[] = [
        "Everyone",
        "Teen",
        "Mature"
    ];
    game: any = undefined;
    gameCoverImage: string = null;
    gameLoaded: boolean = false;
    gameCoverImageUpdated: boolean = false;

    coverImageURLBS = new BehaviorSubject(undefined);
    coverImageURL$ = this.coverImageURLBS.asObservable();

    private $onDestroy = new Subject<undefined>();

    editGameForm: FormGroup = undefined;

    constructor(
        private adminDataService: AdminDataService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private adminService: AdminService,
        private snackBar: MatSnackBar
    ) {
        this.editGameForm = this.formBuilder.group({
            name: ['', Validators.required],
            summary: [''],
            developer: [''],
            parentalRating: [''],
            releaseDate: ['']
        });
    }

    ngOnInit() {
        this.adminDataService.gameInfo$
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((game: any) => {
                this.game = game;

                if (this.game.gameCoverImage) {
                    this.adminDataService.setGameCoverImageName(game.gameCoverImage);
                }

                this.editGameForm.get('name').setValue(this.game.name);
                if (this.game.summary) {
                    this.editGameForm.get('summary').setValue(this.game.summary);
                }
                if (this.game.developer) {
                    this.editGameForm.get('developer').setValue(this.game.developer);
                }
                if (this.game.parentalRating) {
                    this.editGameForm.get('parentalRating').setValue(this.game.parentalRating);
                }
                if (this.game.releaseDate) {
                    let date = new Date(this.game.releaseDate);
                    let year = date.getUTCFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate() + 1;
                    let newDate = new Date(`${month}/${day}/${year}`);
                    this.editGameForm.get('releaseDate').setValue(newDate);
                }
                this.gameLoaded = true;
            });

        this.adminDataService.gameImage$
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((gameCoverImage: any) => {
                this.coverImageURLBS.next(gameCoverImage);
            });

        this.coverImageURL$
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((imageURL: string) => {
                if (imageURL)
                    this.gameCoverImage = imageURL;
            })
    }

    ngOnDestroy(): void {
        this.$onDestroy.next();
        this.$onDestroy.complete();
    }

    loadGame(id: string) {
        this.adminDataService.setGameId(id);
        this.gameLoaded = false;
        this.editGameForm.reset('');
    }

    setGameCoverImage(event) {
        let file = null;
        if (event.target.files[0]) {
            file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.coverImageURLBS.next(reader.result);
                this.gameCoverImageUpdated = true;
            }
        }
    }

    openImageCoverPreview() {
        this.dialog.open(GameCoverImagePreviewDialogComponent, {
            width: '960px',
            data: {imageURL: this.gameCoverImage}
        });
    }

    saveGameEdits() {
        let image = '';
        if (this.gameCoverImageUpdated) {
            image = this.gameCoverImage;
        }
        let id = this.game.id;
        let name = this.editGameForm.get('name').value;
        let summary = this.editGameForm.get('summary').value;
        let developer = this.editGameForm.get('developer').value;
        let parentalRating = this.editGameForm.get('parentalRating').value;
        let releaseDate = this.formatDate(this.editGameForm.get('releaseDate').value);

        this.adminService.editGame(
            id,
            name,
            summary,
            developer,
            parentalRating,
            releaseDate,
            image,
            this.gameCoverImageUpdated
        )
            .pipe(
                takeUntil(this.$onDestroy)
            )
            .subscribe((response: any) => {
                if (response.data.editGame.success) {
                    this.snackBar.open("Game info was successfully updated!", "Close", {duration: 2000});
                    this.gameCoverImageUpdated = false;
                    this.editGameForm.markAsPristine();
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
}
