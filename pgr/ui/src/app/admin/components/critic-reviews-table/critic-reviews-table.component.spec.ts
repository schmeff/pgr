import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CriticReviewsTableComponent} from './critic-reviews-table.component';
import {AddGameComponent} from "../../pages/add-game/add-game.component";
import {EditGameComponent} from "../../pages/edit-game/edit-game.component";
import {GameCoverImagePreviewDialogComponent} from "../game-cover-image-preview-dialog/game-cover-image-preview-dialog.component";
import {AddCriticReviewDialogComponent} from "../add-critic-review-dialog/add-critic-review-dialog.component";
import {DeleteCriticReviewDialogComponent} from "../delete-critic-review-dialog/delete-critic-review-dialog.component";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "../../admin-routing.module";
import {
    MatButtonModule,
    MatDatepickerModule, MatDialog, MatDialogModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Apollo} from "apollo-angular";

describe('CriticReviewsTableComponent', () => {
    let dialogMock = createSpyObj(
        "dialog",
        [
            "open"
        ]
    );

    let adminDataServiceMock = createSpyObj(
        "adminDataService",
        []
    );

    let apolloMock = createSpyObj(
        "apollo",
        []
    );

    let component: CriticReviewsTableComponent;
    let fixture: ComponentFixture<CriticReviewsTableComponent>;

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
                    provide: MatDialog,
                    useValue: dialogMock
                },
                {
                    provide: Apollo,
                    useValue: apolloMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
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
