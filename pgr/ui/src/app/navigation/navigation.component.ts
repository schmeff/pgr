import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'pgr-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    signedIn: boolean = false;
    username: string = undefined;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.signedIn = this.authService.signedIn();
        if(this.signedIn){
            this.username = this.authService.getUsername();
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
