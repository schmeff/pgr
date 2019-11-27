import {RouterModule, Routes} from "@angular/router";
import {EditUserProfileComponent} from "./pages/edit-user-profile/edit-user-profile.component";
import {NgModule} from "@angular/core";
import {CanEditProfileGuard} from "./guards/can-edit-profile.guard";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {UserExistsGuard} from "./guards/user-exists.guard";

const usersRoutes: Routes = [
    {
        path: ':username/profile/edit',
        component: EditUserProfileComponent,
        canActivate: [CanEditProfileGuard]
    },
    {
        path: ':username/profile',
        component: UserProfileComponent,
        canActivate: [UserExistsGuard]
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
