import {fakeAsync, TestBed} from '@angular/core/testing';

import {SearchDataService} from './search-data.service';
import {SearchService} from "./search.service";
import {of, Subject} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SearchDataService', () => {
    let results = {
        data: {
            allGames: {
                edges: [
                    {
                        node: {
                            id: "R2F",
                            name: "Halo"
                        }
                    },
                    {
                        node: {
                            id: "tZU",
                            name: "Halo: Combat Evolved"
                        }
                    }
                ]
            }
        }
    };

    let searchResultsSubject = new Subject<any>();
    let gameSearchQuerySubject = new Subject<any>();

    let searchServiceMock = createSpyObj(
        "searchService",
        ["searchGames"]
    );

    jest.spyOn(searchServiceMock, "searchGames")
        .mockReturnValue(of(results));

    let service: SearchDataService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchService,
                    useValue: searchServiceMock
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.get(SearchDataService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe("getting game search results", () => {

    });
});
