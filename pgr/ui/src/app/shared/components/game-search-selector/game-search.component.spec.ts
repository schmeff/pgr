import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {GameSearchComponent} from './game-search.component';
import {SearchDataService} from "../../services/search-data.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared.module";
import {Subject} from "rxjs";

describe('GameSearchComponent', () => {
    let searchGameResultsSubject = new Subject<any>();

    let component: GameSearchComponent;
    let fixture: ComponentFixture<GameSearchComponent>;

    let searchDataServiceMock = createSpyObj(
        "searchDataService",
        [
            "setGameSearchQuery"
        ]
    );

    searchDataServiceMock.searchGamesResult$ = searchGameResultsSubject.asObservable();


    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchDataService,
                    useValue: searchDataServiceMock
                }
            ],
            imports: [
                SharedModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
