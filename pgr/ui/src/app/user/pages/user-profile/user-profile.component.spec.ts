import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileComponent} from './user-profile.component';
import {EditUserProfileComponent} from "../edit-user-profile/edit-user-profile.component";
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
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../../services/user.service";
import {UserBaseService} from "../../services/user-base.service";
import {ImageService} from "../../../shared/utilities/image.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Apollo} from "apollo-angular";

describe('UserProfileComponent', () => {
    let userServiceMock = createSpyObj(
        "userService",
        [
            "setPublicUsername",
            "setImageUsername"
        ]
    );

    let apolloMock = createSpyObj(
        "apollo",
        []
    );

    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

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
                    provide: Apollo,
                    useValue: apolloMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
