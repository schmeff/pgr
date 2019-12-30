import {TestBed, async, inject} from '@angular/core/testing';

import {CanEditProfileGuard} from './can-edit-profile.guard';
import {AuthService} from "../../auth/services/auth.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('CanEditProfileGuard', () => {
    let authServiceMock = createSpyObj(
        "authService",
        [
            "verifyToken"
        ]
    );

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CanEditProfileGuard,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule]
        });
    });

    it('should ...', inject([CanEditProfileGuard], (guard: CanEditProfileGuard) => {
        expect(guard).toBeTruthy();
    }));
});
