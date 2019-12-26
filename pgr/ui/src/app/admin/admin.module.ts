import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AddGameComponent} from './pages/add-game/add-game.component';
import {
    MatButtonModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditGameComponent} from './pages/edit-game/edit-game.component';
import {SharedModule} from "../shared/shared.module";
import {GameCoverImagePreviewDialogComponent} from './components/game-cover-image-preview-dialog/game-cover-image-preview-dialog.component';
import {CriticReviewsTableComponent} from './components/critic-reviews-table/critic-reviews-table.component';
import {AddCriticReviewDialogComponent} from './components/add-critic-review-dialog/add-critic-review-dialog.component';
import {CdkColumnDef} from "@angular/cdk/table";
import { DeleteCriticReviewDialogComponent } from './components/delete-critic-review-dialog/delete-critic-review-dialog.component';

@NgModule({
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
    entryComponents: [
        GameCoverImagePreviewDialogComponent,
        AddCriticReviewDialogComponent,
        DeleteCriticReviewDialogComponent
    ],
    providers: [
        CdkColumnDef
    ]
})
export class AdminModule {
}
