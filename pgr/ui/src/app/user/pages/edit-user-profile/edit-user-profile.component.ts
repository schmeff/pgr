import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserBaseService} from "../../services/user-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material";
import {ImageService} from "../../../shared/utilities/image.service";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil, timeout} from "rxjs/operators";

@Component({
    selector: 'pgr-edit-user-profile',
    templateUrl: './edit-user-profile.component.html',
    styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit, OnDestroy {
    @ViewChild('fileSelector')
    fileSelector: ElementRef;

    private imageDataURLBS = new BehaviorSubject<any>(undefined);

    profileImage$ = this.userService.profileImage$;
    imageDataURL$ = this.imageDataURLBS.asObservable();
    username$ = this.userService.username$;
    profileInfo$ = this.userService.profileInfo$;

    private $ngDestroy = new Subject();

    oldInfo;
    profileImageURL: string = null;

    email: string = '';
    profileImageChanged: boolean = false;

    editProfileForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.maxLength(100)]),
        bio: new FormControl('', [Validators.maxLength(2000)]),
        showEmail: new FormControl(false)
    });

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private userBaseService: UserBaseService,
                private snackBar: MatSnackBar,
                private imageService: ImageService,
                private router: Router) {
    }

    ngOnInit() {
        this.userService.setUsername(this.route.snapshot.params.username);
        this.userService.setImageUsername(this.route.snapshot.params.username);

        this.profileImage$
            .pipe(takeUntil(this.$ngDestroy))
            .subscribe((profileImageURL: any) => {
                this.imageDataURLBS.next(profileImageURL);
            });

        this.profileInfo$
            .pipe(takeUntil(this.$ngDestroy))
            .subscribe((profile: any) => {
                this.oldInfo = {
                    name: profile.name,
                    bio: profile.bio
                };

                this.email = profile.user.email;
                this.editProfileForm.controls["name"].setValue(this.oldInfo.name);
                this.editProfileForm.controls["bio"].setValue(this.oldInfo.bio);
            });

        this.imageDataURL$
            .pipe(takeUntil(this.$ngDestroy))
            .subscribe((imageDataURL: any) => {
                this.profileImageURL = imageDataURL
            });
    }

    ngOnDestroy(): void {
        this.$ngDestroy.next();
        this.$ngDestroy.complete();
    }

    saveProfile() {
        let newInfo = {
            name: this.editProfileForm.controls["name"].value,
            bio: this.editProfileForm.controls["bio"].value
        };

        let imageUrl = this.profileImageURL ? this.profileImageURL : undefined;

        if (JSON.stringify(newInfo) !== JSON.stringify(this.oldInfo) || this.profileImageChanged) {
            this.userBaseService.saveUserProfile(newInfo.name, newInfo.bio, imageUrl)
                .subscribe((response: any) => {
                    if (response.data.saveUserProfile.success) {
                        this.oldInfo = newInfo;
                        this.router.navigate([`/users/${this.route.snapshot.params.username}/profile`]);
                    }
                });
        } else {
            this.snackBar.open("Account information is already current", "Close", {
                duration: 2000
            });
        }
    }

    openFileSelector() {
        this.fileSelector.nativeElement.click();
    }

    previewProfileImage(event) {
        let file = null;
        if (event.target.files[0]) {
            file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let imageBS = this.imageDataURLBS;
                this.imageService.resizeImage(reader.result, imageBS);
                this.profileImageChanged = true;
            }
        }
    }
}
