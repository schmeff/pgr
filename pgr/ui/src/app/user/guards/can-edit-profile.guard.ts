import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CanEditProfileGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let token = localStorage.getItem("token");

        if(token){
            return this.authService.verifyToken()
                .pipe(
                    map((response: any)=>{
                        return response.data.verifyToken.payload.username === route.params.username;
                    }),
                    catchError((error: any)=>{
                        this.router.navigate(['auth/signin']);
                        return new BehaviorSubject(false).asObservable();
                    })
                )
        }

        this.router.navigate(['auth/signin']);
        return new BehaviorSubject(false).asObservable();
    }
}
