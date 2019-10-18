import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'pgr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  signedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signedIn = this.authService.signedIn();
  }

  signOut(){
    this.authService.signOut();
    location.reload();
  }

}
