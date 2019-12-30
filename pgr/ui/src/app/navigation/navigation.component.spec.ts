import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {Subject} from "rxjs";
import {AuthService} from "../auth/services/auth.service";
import {AuthDataService} from "../auth/services/auth-data.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('NavigationComponent', () => {
    let isStaffMemberMock = new Subject();

    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    let authDataServiceMock = createSpyObj(
        "authDataService",
        ["setIsSignedIn"]
    );

    let routerMock = createSpyObj(
        "router",
        ["navigate"]
    );

    let authServiceMock = createSpyObj(
        "authService",
            [
                "signedIn",
                "getUsername",
                "signOut"
            ]
    );

    let activatedRouteMock = createSpyObj(
        "activatedRoute",
        [
            "routerLink"
        ]
    );

    authDataServiceMock.isStaffMember$ = isStaffMemberMock.asObservable();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationComponent],
            imports: [
                CommonModule,
                MatToolbarModule,
                MatIconModule,
                MatButtonModule,
                MatMenuModule,
                MatButtonModule,
                RouterModule,
                SharedModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: AuthDataService,
                    useValue: authDataServiceMock
                },
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
