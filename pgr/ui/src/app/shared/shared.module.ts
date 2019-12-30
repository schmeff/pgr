import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { GameSearchComponent } from './components/game-search-selector/game-search.component';
import {MatAutocompleteModule, MatInputModule, MatSelectModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [GameSearchComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        BrowserAnimationsModule
    ],
    exports: [
        GameSearchComponent
    ]
})
export class SharedModule {
}
