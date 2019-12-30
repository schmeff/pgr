import {TestBed, async, inject} from '@angular/core/testing';

import {AdminViewGuard} from './admin-view.guard';
import {AuthService} from "../../auth/services/auth.service";
import {AuthDataService} from "../../auth/services/auth-data.service";

describe('AdminViewGuard', () => {
    let authServiceMock = createSpyObj(
        "authService",
        [
            "signedIn"
        ]
    );

    let authDataServiceMock = createSpyObj(
        "authDataService",
        [
            "setIsSignedIn"
        ]
    );

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AdminViewGuard,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: AuthDataService,
                    useValue: authDataServiceMock
                }
            ]
        });
    });

    it('should ...', inject([AdminViewGuard], (guard: AdminViewGuard) => {
        expect(guard).toBeTruthy();
    }));
});
