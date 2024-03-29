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
    MatInputModule, MatSelectModule, MatSnackBarModule, MatTooltipModule
} from "@angular/material";
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
    declarations: [EditUserProfileComponent, UserProfileComponent],
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
        MatSelectModule,
        MatTooltipModule
    ]
})
export class UsersModule {
}
