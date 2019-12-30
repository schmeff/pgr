import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameCoverImagePreviewDialogComponent} from './game-cover-image-preview-dialog.component';
import {AddGameComponent} from "../../pages/add-game/add-game.component";
import {EditGameComponent} from "../../pages/edit-game/edit-game.component";
import {CriticReviewsTableComponent} from "../critic-reviews-table/critic-reviews-table.component";
import {AddCriticReviewDialogComponent} from "../add-critic-review-dialog/add-critic-review-dialog.component";
import {DeleteCriticReviewDialogComponent} from "../delete-critic-review-dialog/delete-critic-review-dialog.component";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "../../admin-routing.module";
import {
    MAT_DIALOG_DATA,
    MatButtonModule,
    MatDatepickerModule, MatDialogModule, MatDialogRef,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('GameCoverImagePreviewDialogComponent', () => {
    let dialogRefMock = createSpyObj(
        "dialogRef",
        [
            "close"
        ]
    );

    let dataMock = createSpyObj(
        "data",
        []
    );

    let component: GameCoverImagePreviewDialogComponent;
    let fixture: ComponentFixture<GameCoverImagePreviewDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddGameComponent,
                EditGameComponent,
                GameCoverImagePreviewDialogComponent,
                CriticReviewsTableComponent,
                AddCriticReviewDialogComponent,
                DeleteCriticReviewDialogComponent
            ],
            imports: [
                CommonModule,
                AdminRoutingModule,
                MatFormFieldModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatButtonModule,
                MatSnackBarModule,
                MatProgressSpinnerModule,
                MatDialogModule,
                SharedModule,
                MatTableModule,
                MatIconModule,
                MatTooltipModule
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: dialogRefMock
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: dataMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
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
