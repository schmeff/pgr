import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";

const authRoutes: Routes = [
    {path: 'signin', component: LoginComponent},
    {path: 'signup', component: SignUpComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
