import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private displayBS: BehaviorSubject<boolean> = new BehaviorSubject(true);

    display$: Observable<boolean> = this.displayBS.asObservable();

    constructor() {
    }

    displayNavigationMenu(display: boolean){
        this.displayBS.next(display);
    }
}
