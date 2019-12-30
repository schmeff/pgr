import {TestBed, async, inject} from '@angular/core/testing';

import {UserExistsGuard} from './user-exists.guard';
import {UserBaseService} from "../services/user-base.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('UserExistsGuard', () => {
    let userBaseServiceMock = createSpyObj(
        "userBaseService",
        [
            "userExists"
        ]
    );

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserExistsGuard,
                {
                    provide: UserBaseService,
                    useValue: userBaseServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('should ...', inject([UserExistsGuard], (guard: UserExistsGuard) => {
        expect(guard).toBeTruthy();
    }));
});
