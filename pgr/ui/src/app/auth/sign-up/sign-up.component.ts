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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validators: this.checkPasswords});
  signingUp: boolean = false;
  signUpError: boolean = false;
  signUpErrorDescription: string = null;
  matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSignUp() {
    this.authService.signUp(
      this.signUpForm.controls["email"].value,
      this.signUpForm.controls["username"].value,
      this.signUpForm.controls["password"].value)
      .subscribe((response: any)=>{
        localStorage.setItem("username", response.data.createUser.user.username);
        this.router.navigateByUrl('/auth/signin')
      });
  }

  checkPasswords(group: FormGroup){
    let password = group.controls["password"].value;
    let confirmPassword = group.controls["confirmPassword"].value;

    return password === confirmPassword ? null : { notSame: true }
  }

}
