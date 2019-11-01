import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {CustomErrorStateMatcher} from "../../shared/customer-error-state-matcher/CustomErrorStateMatcher";

@Component({
    selector: 'pgr-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^[a-zA-Z0-9_]*$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
    }, {validators: this.checkPasswords});
    signingUp: boolean = false;
    signUpError: boolean = false;
    signUpErrorDescription: string = null;
    matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onSignUp() {
        this.signUpError = false;
        this.signingUp = true;
        this.authService.signUp(
            this.signUpForm.controls["email"].value,
            this.signUpForm.controls["username"].value,
            this.signUpForm.controls["password"].value)
            .subscribe((response: any) => {
                    this.signingUp = false;
                    localStorage.setItem("username", response.data.createUser.user.username);
                    this.router.navigate(['/auth/signin'])
                },
                (err) => {
                    this.signingUp = false;
                    let possibleErrors = [
                        "Email is already in use",
                        "Email is invalid",
                        "Username is already in use",
                        "Password is too short"
                    ];

                    if(possibleErrors.includes(err.graphQLErrors[0].message)){
                        this.signUpErrorDescription = err.graphQLErrors[0].message;
                        this.signUpError = true;
                    }

                });
    }

    checkPasswords(group: FormGroup) {
        let password = group.controls["password"].value;
        let confirmPassword = group.controls["confirmPassword"].value;

        return password === confirmPassword ? null : {notSame: true}
    }
}
