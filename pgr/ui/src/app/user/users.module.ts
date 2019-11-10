import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserProfileComponent} from './pages/edit-user-profile/edit-user-profile.component';
import {UsersRoutingModule} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatSelectModule, MatSnackBarModule
} from "@angular/material";

@NgModule({
    declarations: [EditUserProfileComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSelectModule
    ]
})
export class UsersModule {
}
