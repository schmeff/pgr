import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGameComponent} from './edit-game.component';
import {AddGameComponent} from "../add-game/add-game.component";
import {GameCoverImagePreviewDialogComponent} from "../../components/game-cover-image-preview-dialog/game-cover-image-preview-dialog.component";
import {CriticReviewsTableComponent} from "../../components/critic-reviews-table/critic-reviews-table.component";
import {AddCriticReviewDialogComponent} from "../../components/add-critic-review-dialog/add-critic-review-dialog.component";
import {DeleteCriticReviewDialogComponent} from "../../components/delete-critic-review-dialog/delete-critic-review-dialog.component";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "../../admin-routing.module";
import {
    MatButtonModule,
    MatDatepickerModule, MatDialog, MatDialogModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBar, MatSnackBarModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {AdminService} from "../../services/admin.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AdminDataService} from "../../services/admin-data.service";
import {Apollo} from "apollo-angular";
import {Subject} from "rxjs";


describe('EditGameComponent', () => {
    let gameInfoSubject = new Subject();
    let gameImageSubject = new Subject();
    let coverImageURLSubject = new Subject();

    let adminServiceMock = createSpyObj(
        "adminService",
        [
            "editGame"
        ]
    );

    let snackBarMock = createSpyObj(
        "snackBar",
        [
            "open"
        ]
    );

    let dialogMock = createSpyObj(
        "dialog",
        [
            "open"
        ]
    );

    let adminDataServiceMock = createSpyObj(
        "adminDataService",
        [
            "setGameCoverImageName",
            "setGameId"
        ]
    );

    let formBuilderMock = createSpyObj(
        "formBuilder",
        [
            "group"
        ]
    );

    let apolloMock = createSpyObj(
        "apollo",
        []
    );

    adminDataServiceMock.gameInfo$ = gameInfoSubject.asObservable();
    adminDataServiceMock.gameImage$ = gameInfoSubject.asObservable();

    let component: EditGameComponent;
    let fixture: ComponentFixture<EditGameComponent>;

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
                    provide: AdminService,
                    useValue: adminServiceMock
                },
                {
                    provide: MatSnackBar,
                    useValue: snackBarMock
                },
                {
                    provide: MatDialog,
                    useValue: dialogMock
                },
                {
                    provide: AdminDataService,
                    useValue: adminDataServiceMock
                },
                {
                    provide: FormBuilder,
                    useValue: formBuilderMock
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
        fixture = TestBed.createComponent(EditGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
