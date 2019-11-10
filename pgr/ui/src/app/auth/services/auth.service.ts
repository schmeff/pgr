import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private apollo: Apollo,
        private router: Router
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

    signUp(email: string, username: string, password: string): Observable<any> {
        const submitSignUp = gql`
      mutation {
        createUser(username: "${username}", password: "${password}", email: "${email}"){
          user {
            username
          }
        } 
      }
    `;

        return this.apollo
            .mutate({
                mutation: submitSignUp
            });
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        this.apollo.getClient().resetStore();
    }

    signedIn() {
        return !!this.getToken();
    }

    verifyToken() {
        const verifyToken = gql`
            mutation {
                verifyToken(token: "${this.getToken()}"){
                    payload
                }
            }
        `;

        return this.apollo
            .mutate({
                mutation: verifyToken
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUsername(){
        if(!localStorage.getItem("username")){
            this.signOut();
            this.router.navigate(['/auth/signin']);
        }
        return localStorage.getItem("username");
    }

}
