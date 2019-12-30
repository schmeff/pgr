import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Apollo} from "apollo-angular";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthService', () => {
    let apolloMock = createSpyObj(
        "apollo",
        [
            "mutate",
            "getClient",
            "watchQuery"
        ]
    );

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: Apollo,
                useValue: apolloMock
            }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
