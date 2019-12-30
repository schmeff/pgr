import {TestBed} from '@angular/core/testing';

import {AdminDataService} from './admin-data.service';
import {AdminService} from "./admin.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminDataService', () => {
    let adminServiceMock = createSpyObj(
        "adminService",
        [
            "getGame",
            "getGameCoverImage",
            "getCriticReview",
            "addCriticReview",
            "editCriticReview",
            "deleteCriticReview"
        ]
    );

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: AdminService,
                useValue: adminServiceMock
            }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    it('should be created', () => {
        const service: AdminDataService = TestBed.get(AdminDataService);
        expect(service).toBeTruthy();
    });
});
