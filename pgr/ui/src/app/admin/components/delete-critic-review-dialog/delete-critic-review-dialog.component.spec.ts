import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCriticReviewDialogComponent} from './delete-critic-review-dialog.component';
import {AddGameComponent} from "../../pages/add-game/add-game.component";
import {EditGameComponent} from "../../pages/edit-game/edit-game.component";
import {GameCoverImagePreviewDialogComponent} from "../game-cover-image-preview-dialog/game-cover-image-preview-dialog.component";
import {CriticReviewsTableComponent} from "../critic-reviews-table/critic-reviews-table.component";
import {AddCriticReviewDialogComponent} from "../add-critic-review-dialog/add-critic-review-dialog.component";
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
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AdminDataService} from "../../services/admin-data.service";

describe('DeleteCriticReviewDialogComponent', () => {
    let dialogRefMock = createSpyObj(
        "dialogRef",
        [
            "close"
        ]
    );

    let adminDataServiceMock = createSpyObj(
        "adminDataService",
        [
            "deleteCriticReview"
        ]
    );

    let dataMock = createSpyObj(
        "data",
        []
    );

    let component: DeleteCriticReviewDialogComponent;
    let fixture: ComponentFixture<DeleteCriticReviewDialogComponent>;

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
                    provide: AdminDataService,
                    useValue: adminDataServiceMock
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
        fixture = TestBed.createComponent(DeleteCriticReviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
