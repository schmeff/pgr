import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EditUserProfileComponent} from './edit-user-profile.component';
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {CommonModule} from "@angular/common";
import {UsersRoutingModule} from "../../user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatSelectModule, MatSnackBar, MatSnackBarModule, MatTooltipModule
} from "@angular/material";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../services/user.service";
import {UserBaseService} from "../../services/user-base.service";
import {ImageService} from "../../../shared/utilities/image.service";
import {BehaviorSubject} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EditUserProfileComponent', () => {
    let profileInfoData = {
        name: "testuser",
        bio: "howdy",
        user: {
            email: "test@test.com"
        }
    };

    let profileImageData = "asdfasdf878";

    let profileImageSubject = new BehaviorSubject(profileImageData);
    let profileInfoSubject = new BehaviorSubject(profileInfoData);
    let imageDataURLSubject = new BehaviorSubject(profileImageData);
    let saveUserProfileSubject = new BehaviorSubject({data: {saveUserProfile: {success: true}}});

    let userServiceMock = createSpyObj(
        "userService",
        [
            "setUsername",
            "setImageUsername"
        ]
    );

    let userBaseServiceMock = createSpyObj(
        "userBaseService",
        [
            "saveUserProfile"
        ]
    );

    let snackBarMock = createSpyObj(
        "snackBar",
        [
            "open"
        ]
    );

    let imageServiceMock = createSpyObj(
        "imageService",
        [
            "resizeProfileImage"
        ]
    );

    jest.spyOn(
        userBaseServiceMock,
        "saveUserProfile"
    ).mockReturnValue(saveUserProfileSubject.asObservable());

    let component: EditUserProfileComponent;
    let fixture: ComponentFixture<EditUserProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditUserProfileComponent, UserProfileComponent],
            imports: [
                CommonModule,
                UsersRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                MatSnackBarModule,
                MatSelectModule,
                MatTooltipModule,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: UserService,
                    useValue: userServiceMock
                },
                {
                    provide: UserBaseService,
                    useValue: userBaseServiceMock
                },
                {
                    provide: MatSnackBar,
                    useValue: snackBarMock
                },
                {
                    provide: ImageService,
                    useValue: imageServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserProfileComponent);
        component = fixture.componentInstance;
        component.profileImage$ = profileImageSubject.asObservable();
        component.profileInfo$ = profileInfoSubject.asObservable();
        component.imageDataURL$ = imageDataURLSubject.asObservable();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("OnInit", () => {
        it("should set the username and image", () => {
            let username = "testuser";

            component.route.snapshot.params.username = username;
            component.ngOnInit();

            expect(userServiceMock.setUsername).toHaveBeenCalledWith(username);
            expect(userServiceMock.setImageUsername).toHaveBeenCalledWith(username);
        });

        it("should set the profile info", fakeAsync(() => {
            component.ngOnInit();

            tick();
            expect(component.editProfileForm.controls["name"].value).toBe("testuser");
            expect(component.editProfileForm.controls["bio"].value).toBe("howdy");
            expect(component.email).toBe("test@test.com");
        }));

        it("should set the profile image", fakeAsync(() => {
            component.ngOnInit();

            tick();
            expect(component.profileImageURL).toBe(profileImageData);
        }));
    });

    describe("saveProfile", () => {
        beforeEach(()=>{
           spyOn(component.router, "navigate");
        });

        it("should open the snackbar message becaues the data hasn't changed", () => {
            component.profileImageChanged = false;
            component.editProfileForm.controls["name"].setValue("testuser");
            component.editProfileForm.controls["bio"].setValue("howdy");
            component.oldInfo = {
                name: "testuser",
                bio: "howdy"
            };

            component.saveProfile();

            expect(snackBarMock.open).toHaveBeenCalled();
        });

        it("should save profile if image has changed", fakeAsync(() => {
            component.profileImageChanged = true;
            component.editProfileForm.controls["name"].setValue("testuser");
            component.editProfileForm.controls["bio"].setValue("howdy");
            component.oldInfo = {
                name: "testuser",
                bio: "howdy"
            };
            component.route.snapshot.params.username = "testuser";

            component.saveProfile();
            expect(userBaseServiceMock.saveUserProfile).toHaveBeenCalled();
            tick();
            expect(component.router.navigate).toHaveBeenCalled();
            expect(component.oldInfo).toBe(component.oldInfo);
        }));

        it("should save profile if the info has changed", fakeAsync(()=>{
            component.profileImageChanged = true;
            component.editProfileForm.controls["name"].setValue("testuserzzz");
            component.editProfileForm.controls["bio"].setValue("howdy");
            component.oldInfo = {
                name: "testuser",
                bio: "howdy"
            };
            component.route.snapshot.params.username = "testuser";
            component.saveProfile();
            expect(userBaseServiceMock.saveUserProfile).toHaveBeenCalled();
            tick();
            expect(component.router.navigate).toHaveBeenCalled();
            expect(component.oldInfo).toStrictEqual({
                name: "testuserzzz",
                bio: "howdy"
            });
        }));
    });
});
