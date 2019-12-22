import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SearchDataService} from "../../services/search-data.service";
import {skipWhile, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'pgr-game-search',
    templateUrl: './game-search.component.html',
    styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit, OnDestroy {
    @Output()
    selected: EventEmitter<string> = new EventEmitter();

    gameOptions: any = null;

    $ngDestroy = new Subject();

    constructor(
        private searchDataService: SearchDataService
    ) {
    }

    ngOnInit() {
        this.searchDataService.searchGamesResult$
            .pipe(
                takeUntil(this.$ngDestroy)
            )
            .subscribe(data=>{
                this.gameOptions = data;
            });
    }

    ngOnDestroy(): void {
        this.$ngDestroy.next();
        this.$ngDestroy.complete();
    }

    setSearchQuery(value){
        if(value){
            this.searchDataService.setGameSearchQuery(value);
        }
        else{
            this.gameOptions = null;
        }
    }

    updateSelectedOption(event){
        let option = this.gameOptions.find((option: any)=>{
            return option.name === event.option.viewValue;
        });
        this.selected.emit(option.id);
    }

}
