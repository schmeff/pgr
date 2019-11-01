import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from "@angular/material";
import {SignUpComponent} from './sign-up/sign-up.component';


@NgModule({
    declarations: [LoginComponent, SignUpComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatIconModule
    ]
})
export class AuthModule {
}
