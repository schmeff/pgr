import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserBaseService} from "./user-base.service";
import {map, switchMap} from "rxjs/operators";
import {ImageService} from "../../shared/utilities/image.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usernameBS = new BehaviorSubject('');

    username$ = this.usernameBS.asObservable();

    constructor(
        private userBaseService: UserBaseService) {
    }


    profileInfo$ = this.username$.pipe(
        switchMap((username): any => {
            return this.userBaseService.getUserProfileEdit(username);
        }),
        map((response: any) => {
            return response.data.profileEdit;
        })
    );

    profileImage$ = this.username$
        .pipe(
            switchMap((username): any => {
                return this.userBaseService.getUserProfileImage(username);
            }),
            map((response: any)=>{
                return response.data.profileImage.profileImage;
            })
        );

    setUsername(username: string) {
        this.usernameBS.next(username);
    }
}
