import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "../../auth-routing.module";
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../../navigation/services/navigation.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SignUpComponent', () => {
    let authServiceMock = createSpyObj(
        "authService",
        [
            "signUp"
        ]
    );

    let navigationServiceMock = createSpyObj(
        "navigationService",
        [
            "displayNavigationMenu"
        ]
    );

    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent, LoginComponent],
            imports: [
                CommonModule,
                AuthRoutingModule,
                MatInputModule,
                MatCardModule,
                MatButtonModule,
                MatFormFieldModule,
                FormsModule,
                ReactiveFormsModule,
                MatChipsModule,
                MatProgressSpinnerModule,
                MatTooltipModule,
                MatIconModule,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: NavigationService,
                    useValue: navigationServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
