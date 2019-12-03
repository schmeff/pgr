import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddGameComponent} from "./pages/add-game/add-game.component";
import {AdminViewGuard} from "./guards/admin-view.guard";

const adminRoutes: Routes = [
    {
        path: 'add-game',
        component: AddGameComponent,
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
