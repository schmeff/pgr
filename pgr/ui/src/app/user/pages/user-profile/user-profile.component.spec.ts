import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

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
    MatInputModule, MatSelectModule, MatSnackBarModule, MatTooltipModule
} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../../services/user.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Apollo} from "apollo-angular";
import {AuthService} from "../../../auth/services/auth.service";

describe('UserProfileComponent', () => {
    let userServiceMock = createSpyObj(
        "userService",
        [
            "setPublicUsername",
            "setImageUsername"
        ]
    );

    let authServiceMock = createSpyObj(
        "authService",
        [
            "getUsername"
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
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock
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

    describe("OnInit", () => {
        it("should set image username and image", () => {
            jest.spyOn(
                authServiceMock,
                "getUsername"
            ).mockReturnValue("testuser");

            component.route.snapshot.params.username = "testuser";
            component.ngOnInit();

            expect(userServiceMock.setPublicUsername).toHaveBeenCalledWith("testuser");
            expect(userServiceMock.setImageUsername).toHaveBeenCalledWith("testuser");
            expect(component.isUser).toBe(true);
        });

        it("should set isUser to false", ()=>{
            jest.spyOn(
                authServiceMock,
                "getUsername"
            ).mockReturnValue("testuser");

            component.route.snapshot.params.username = "testuser1";
            component.ngOnInit();

            expect(component.isUser).toBe(false);
        });
    });
});
