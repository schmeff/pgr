import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo
  ) {
  }

  signIn(username: string, password: string): Observable<object> {
    const submitSignIn = gql`
      mutation {
        tokenAuth(username: "${username}", password: "${password}"){
          token
        }
      }
    `;

    return this.apollo
      .mutate({
        mutation: submitSignIn
      });
  }

  signUp(username: string, email: string, password: string): any {

  }

  signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.apollo.getClient().resetStore();
  }

  signedIn(){
    return !!localStorage.getItem('token');
  }


}
