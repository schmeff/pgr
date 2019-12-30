import {async, ComponentFixture, TestBed} from '@angular/core/testing';

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
import {Subject} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EditUserProfileComponent', () => {
    let profileImageSubject = new Subject();
    let profileInfoSubject = new Subject();
    let imageDataURLSubject = new Subject();

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
});
