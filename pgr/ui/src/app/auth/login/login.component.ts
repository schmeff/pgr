import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pgr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  invalidCredentials = false;
  signingIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSignIn() {
    this.signingIn = true;
    this.authService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .subscribe((response: any) => {
          this.invalidCredentials = false;
          localStorage.setItem('token', response.data.tokenAuth.token);
          localStorage.setItem('username', this.loginForm.controls['username'].value);
          this.signingIn = false;
          this.router.navigateByUrl('/home')
        },
        (err) => {
          if(err.message.includes("enter valid credentials")){
            this.invalidCredentials = true;
          }
          this.signingIn = false;
        });
  }



}
