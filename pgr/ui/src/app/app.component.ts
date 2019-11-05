import {Component} from '@angular/core';
import {NavigationService} from "./navigation/services/navigation.service";
import {delay} from "rxjs/operators";

@Component({
    selector: 'pgr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    displayNavigation$ = this.navigationService.display$
        .pipe(
            delay(0)
        );

    constructor(
        private navigationService: NavigationService
    ) {
    }

    onActivate($event) {
        this.navigationService.displayNavigationMenu(true);
    }
}
