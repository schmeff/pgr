import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {NavigationService} from "./services/navigation.service";

@Component({
    selector: 'pgr-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    display$ = this.navigationService.display$;

    signedIn: boolean = false;

    constructor(
        private authService: AuthService,
        private navigationService: NavigationService
    ) {
    }

    ngOnInit() {
        this.signedIn = this.authService.signedIn();
    }

    signOut() {
        this.authService.signOut();
        location.reload();
    }

}
