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

    isStaffMember() {
        const isStaffMember = gql(`
            query {
                isStaffMember{
                    isStaff
                }
            }
        `);

        return this.apollo.watchQuery({
            query: isStaffMember
        }).valueChanges;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUsername(){
        return localStorage.getItem("username");
    }

}
