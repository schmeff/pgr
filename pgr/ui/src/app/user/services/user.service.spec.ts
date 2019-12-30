import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {UserBaseService} from "./user-base.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('UserService', () => {
    let userBaseServiceMock = createSpyObj(
        "userBaseService",
        [
            "getUserProfileEdit",
            "getUserPublicProfile",
            "getUserProfileImage"
        ]
    );

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: UserBaseService,
                useValue: userBaseServiceMock
            }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });
});
