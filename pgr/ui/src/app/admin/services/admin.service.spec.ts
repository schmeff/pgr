import {TestBed} from '@angular/core/testing';

import {AdminService} from './admin.service';
import {Apollo} from "apollo-angular";

describe('AdminService', () => {
    let apolloMock = createSpyObj(
        "apollo",
        [
            "mutate",
            "watchQuery"
        ]
    );

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: Apollo,
                useValue: apolloMock
            }
        ]
    }));

    it('should be created', () => {
        const service: AdminService = TestBed.get(AdminService);
        expect(service).toBeTruthy();
    });
});
