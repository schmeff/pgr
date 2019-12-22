import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AddGameComponent} from './pages/add-game/add-game.component';
import {
    MatButtonModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import {SharedModule} from "../shared/shared.module";
import { GameCoverImagePreviewDialogComponent } from './components/game-cover-image-preview-dialog/game-cover-image-preview-dialog.component';

@NgModule({
    declarations: [
        AddGameComponent,
        EditGameComponent,
        GameCoverImagePreviewDialogComponent
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
        SharedModule
    ],
    entryComponents: [
        GameCoverImagePreviewDialogComponent
    ]
})
export class AdminModule {
}
