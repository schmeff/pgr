import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserBaseService} from "../../services/user-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'pgr-edit-user-profile',
    templateUrl: './edit-user-profile.component.html',
    styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
    username$ = this.userService.username$;
    profileInfo$ = this.userService.profileInfo$;

    oldInfo;

    email: string = '';

    editProfileForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.maxLength(100)]),
        bio: new FormControl('', [Validators.maxLength(2000)]),
        showEmail: new FormControl(false)
    });

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private userBaseService: UserBaseService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.userService.setUsername(this.route.snapshot.params.username);

        this.profileInfo$.subscribe((profile: any) => {
            this.oldInfo = {
                name: profile.name,
                bio: profile.bio
            };

            this.email = profile.user.email;
            this.editProfileForm.controls["name"].setValue(this.oldInfo.name);
            this.editProfileForm.controls["bio"].setValue(this.oldInfo.bio);
        });
    }

    saveProfile() {
        let newInfo = {
            name: this.editProfileForm.controls["name"].value,
            bio: this.editProfileForm.controls["bio"].value
        };

        if (JSON.stringify(newInfo) !== JSON.stringify(this.oldInfo)) {
            this.userBaseService.saveUserProfile(newInfo.name, newInfo.bio)
                .subscribe((response: any) => {
                    if (response.data.saveUserProfile.success) {
                        this.snackBar.open("Account information has been updated", "Close", {
                            duration: 2000
                        });
                        this.oldInfo = newInfo;
                    }
                });
        } else {
            this.snackBar.open("Account information is already current", "Close", {
                duration: 2000
            });
        }
    }
}
