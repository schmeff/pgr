import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";
import {map, skipWhile, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    private isSignedInBS = new BehaviorSubject(false);

    constructor(
        private authService: AuthService
    ) {
    }

    isStaffMember$ = this.isSignedInBS
        .pipe(
            skipWhile((signedIn: boolean) => signedIn === false),
            switchMap((): any => this.authService.isStaffMember()),
            map((response: any) => {
                return response.data.isStaffMember.isStaff;
            })
        );

    setIsSignedIn(signedIn: boolean){
        this.isSignedInBS.next(signedIn);
    }
}
