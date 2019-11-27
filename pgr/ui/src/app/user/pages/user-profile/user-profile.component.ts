import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
    selector: 'pgr-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    publicProfileInfo$ = this.userService.publicProfileInfo$;
    profileImage$ = this.userService.profileImage$;
    username: string = undefined;
    isUser: boolean = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.username = this.route.snapshot.params.username;
        this.userService.setPublicUsername(this.username);
        this.userService.setImageUsername(this.username);

        this.isUser = this.authService.getUsername() === this.route.snapshot.params.username;
    }

}
