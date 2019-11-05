import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'pgr-edit-user-profile',
    templateUrl: './edit-user-profile.component.html',
    styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

    constructor(private authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.authService.verifyToken()
        .subscribe((response: any) => {
            if (this.route.snapshot.params.username != response.data.verifyToken.payload.username) {
                window.history.back();
            }
        });
    }

}
