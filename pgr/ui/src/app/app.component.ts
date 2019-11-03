import {Component} from '@angular/core';
import {NavigationService} from "./navigation/services/navigation.service";

@Component({
    selector: 'pgr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    displayNavigation$ = this.navigationService.display$;

    constructor(
        private navigationService: NavigationService
    ){}

    onActivate($event){
        this.navigationService.displayNavigationMenu(true);
    }
}
