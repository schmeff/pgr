import {TestBed} from '@angular/core/testing';

import {UserBaseService} from './user-base.service';
import {Apollo} from "apollo-angular";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('UserBaseService', () => {
    let apolloMock = createSpyObj(
        "apollo",
        [
            "watchQuery",
            "mutate"
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
        const service: UserBaseService = TestBed.get(UserBaseService);
        expect(service).toBeTruthy();
    });
});
