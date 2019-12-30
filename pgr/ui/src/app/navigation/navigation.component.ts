import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {AuthDataService} from "../auth/services/auth-data.service";

@Component({
    selector: 'pgr-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    signedIn: boolean = false;
    username: string = undefined;

    isStaff$ = this.authDataService.isStaffMember$;

    constructor(
        public authService: AuthService,
        private router: Router,
        public authDataService: AuthDataService
    ) {
    }

    ngOnInit() {
        this.signedIn = this.authService.signedIn();
        if(this.signedIn){
            this.username = this.authService.getUsername();
            this.authDataService.setIsSignedIn(true);
        }
    }

    signOut() {
        this.authService.signOut();
        location.reload();
    }

    goHome(){
        this.router.navigate(['/home']);
    }

}
