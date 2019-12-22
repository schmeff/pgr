import {Injectable} from '@angular/core';
import {SearchService} from "./search.service";
import {BehaviorSubject} from "rxjs";
import {debounceTime, map, skipWhile, switchMap, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {
    private gameSearchQueryBS = new BehaviorSubject('');

    gameSearchQuery$ = this.gameSearchQueryBS.asObservable();

    constructor(
        private searchService: SearchService
    ) {
    }

    searchGamesResult$ = this.gameSearchQuery$
        .pipe(
            skipWhile(query => !query),
            debounceTime(500),
            switchMap((queryString): any=>{
                return this.searchService.searchGames(queryString);
            }),
            map((result: any)=>{
                let data = result.data.allGames.edges;

                return data.map((value: any)=>{
                    return {
                        id: value.node.id,
                        name: value.node.name
                    }
                });
            })
        );

    setGameSearchQuery(queryString: string){
        this.gameSearchQueryBS.next(queryString);
    }
}
