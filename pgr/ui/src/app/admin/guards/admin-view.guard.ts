import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {AuthDataService} from "../../auth/services/auth-data.service";

@Injectable({
    providedIn: 'root'
})
export class AdminViewGuard implements CanActivate {


    constructor(
        private authService: AuthService,
        private authDataService: AuthDataService
    ){
        let signedIn = this.authService.signedIn();
        this.authDataService.setIsSignedIn(signedIn);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authDataService.isStaffMember$;
    }
}
