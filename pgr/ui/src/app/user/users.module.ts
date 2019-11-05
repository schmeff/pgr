import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserProfileComponent} from './pages/edit-user-profile/edit-user-profile.component';
import {UsersRoutingModule} from "./user-routing.module";

@NgModule({
    declarations: [EditUserProfileComponent],
    imports: [
        CommonModule,
        UsersRoutingModule
    ]
})
export class UsersModule {
}
