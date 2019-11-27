import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserBaseService} from "./user-base.service";
import {map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usernameBS = new BehaviorSubject('');
    private usernamePublicBS = new BehaviorSubject('');
    private imageUsernameBS = new BehaviorSubject('');

    username$ = this.usernameBS.asObservable();
    usernamePublic$ = this.usernamePublicBS.asObservable();
    imageUsername$ = this.imageUsernameBS.asObservable();

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

    publicProfileInfo$ = this.usernamePublic$.pipe(
        switchMap((username)=>{
            return this.userBaseService.getUserPublicProfile(username)
        }),
        map((response: any) => {
            return response.data.publicProfile
        })
    );

    profileImage$ = this.imageUsername$
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

    setPublicUsername(username: string){
        this.usernamePublicBS.next(username);
    }

    setImageUsername(username: string){
        this.imageUsernameBS.next(username);
    }
}
