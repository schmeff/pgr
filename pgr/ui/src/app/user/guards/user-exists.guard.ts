import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserBaseService} from "../services/user-base.service";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserExistsGuard implements CanActivate {

    constructor(
        private userBaseService: UserBaseService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userBaseService.userExists(route.params.username)
            .pipe(
                map((response: any)=>{
                    return response.data.userExists.exists;
                })
            );
    }
}
