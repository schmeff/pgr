import {fakeAsync, TestBed} from '@angular/core/testing';

import {SearchService} from './search.service';
import {Apollo} from "apollo-angular";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SearchService', () => {
    let apolloMock = createSpyObj(
        "apollo",
        ["watchQuery"]
    );

    let service: SearchService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Apollo,
                    useValue: apolloMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.get(SearchService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
