import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddGameComponent} from "./pages/add-game/add-game.component";
import {AdminViewGuard} from "./guards/admin-view.guard";
import {EditGameComponent} from "./pages/edit-game/edit-game.component";

const adminRoutes: Routes = [
    {
        path: 'add-game',
        component: AddGameComponent,
        canActivate: [AdminViewGuard]
    },
    {
        path: 'edit-game',
        component: EditGameComponent,
        canActivate: [AdminViewGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}
