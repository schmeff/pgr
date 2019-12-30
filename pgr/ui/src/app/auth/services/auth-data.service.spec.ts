import {TestBed} from '@angular/core/testing';

import {AuthDataService} from './auth-data.service';
import {AuthService} from "./auth.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthDataService', () => {
    let authServiceMock = createSpyObj(
        "authService",
        [
            "isStaffMember"
        ]
    );

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: AuthService,
                useValue: authServiceMock
            }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    it('should be created', () => {
        const service: AuthDataService = TestBed.get(AuthDataService);
        expect(service).toBeTruthy();
    });
});
