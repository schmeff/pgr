import {RouterModule, Routes} from "@angular/router";
import {EditUserProfileComponent} from "./pages/edit-user-profile/edit-user-profile.component";
import {NgModule} from "@angular/core";
import {CanEditProfileGuard} from "./guards/can-edit-profile.guard";

const usersRoutes: Routes = [
    {
        path: ':username/profile/edit',
        component: EditUserProfileComponent,
        canActivate: [CanEditProfileGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule {
}
