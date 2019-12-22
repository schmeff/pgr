import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [NavigationComponent],
    exports: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        SharedModule
    ]
})
export class NavigationModule {
}
