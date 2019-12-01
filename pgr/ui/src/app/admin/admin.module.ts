import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { AddGameComponent } from './add-game/add-game.component';

@NgModule({
    declarations: [AddGameComponent],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
