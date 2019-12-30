import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SearchDataService} from './search-data.service';
import {SearchService} from "./search.service";
import {BehaviorSubject, Subject} from "rxjs";
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

    let searchGamesSubject = new BehaviorSubject(results);

    let searchServiceMock = createSpyObj(
        "searchService",
        ["searchGames"]
    );

    jest.spyOn(searchServiceMock, "searchGames")
        .mockReturnValue(searchGamesSubject.asObservable());

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
        let searchQueryData;

        beforeEach(fakeAsync(() => {
            service.searchGamesResult$.subscribe(data => {
                searchQueryData = data;
            });
            service.setGameSearchQuery("halo");
            tick(600);
        }));

        it("should set the query results", fakeAsync(()=>{
            let expectedSearchResults = [
                {
                    id: "R2F",
                    name: "Halo"
                },
                {
                    id: "tZU",
                    name: "Halo: Combat Evolved"
                }
            ];

            expect(searchServiceMock.searchGames).toHaveBeenCalledWith("halo");
            expect(searchQueryData).toStrictEqual(expectedSearchResults);
        }));
    });
});
