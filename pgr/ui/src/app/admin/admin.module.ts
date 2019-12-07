import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AddGameComponent, CoverImagePreviewDialog} from './pages/add-game/add-game.component';
import {
    MatButtonModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AddGameComponent,
        CoverImagePreviewDialog
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
        MatDialogModule
    ],
    entryComponents: [
        CoverImagePreviewDialog
    ]
})
export class AdminModule {
}
