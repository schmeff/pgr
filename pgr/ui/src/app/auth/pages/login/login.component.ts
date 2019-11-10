import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NavigationService} from "../../../navigation/services/navigation.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'pgr-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
    invalidCredentials = false;
    signingIn = false;

    private $ngOnDestroy: Subject<undefined> = new Subject();

    constructor(
        private authService: AuthService,
        private router: Router,
        private navigationService: NavigationService
    ) {

    }

    ngOnInit() {
        this.navigationService.displayNavigationMenu(false);
    }

    ngOnDestroy(): void {
        this.$ngOnDestroy.next();
        this.$ngOnDestroy.complete();
    }

    onSignIn() {
        this.signingIn = true;
        this.authService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
            .pipe(
                takeUntil(this.$ngOnDestroy)
            )
            .subscribe((response: any) => {
                    this.invalidCredentials = false;
                    localStorage.setItem('token', response.data.tokenAuth.token);
                    localStorage.setItem('username', this.loginForm.controls['username'].value);
                    this.router.navigate(['/home']);
                },
                (err) => {
                    if (err.message.includes("enter valid credentials")) {
                        this.invalidCredentials = true;
                    }
                    this.signingIn = false;
                });
    }


}
