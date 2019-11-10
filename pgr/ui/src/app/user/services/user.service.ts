import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {UserBaseService} from "./user-base.service";
import {map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private userBaseService: UserBaseService) {
    }

    private usernameBS = new BehaviorSubject('');

    username$ = this.usernameBS.asObservable();

    profileInfo$ = combineLatest(this.username$).pipe(
        switchMap((data): any => {
            return this.userBaseService.getUserProfileEdit(data[0]);
        }),
        map((response: any) => {
            return response.data.profileEdit;
        })
    );

    setUsername(username: string) {
        this.usernameBS.next(username);
    }
}
