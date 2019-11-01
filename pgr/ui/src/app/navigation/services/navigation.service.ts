import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private displayBS: BehaviorSubject<boolean> = new BehaviorSubject(true);

    display$ = this.displayBS.asObservable();

    constructor() {
    }

    displayNavigationMenu(display: boolean){
        this.displayBS.next(display);
    }
}
