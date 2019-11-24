import {Injectable} from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

@Injectable({
    providedIn: 'root'
})
export class UserBaseService {
    constructor(private apollo: Apollo) {
    }

    getUserProfileEdit(username: string) {
        const getUserProfileEdit = gql(`
            query {
                profileEdit(username: "${username}"){
                    user{
                        username
                        email
                    }
                    name
                    bio
                }
            }
        `);

        return this.apollo
            .watchQuery({
                query: getUserProfileEdit
            })
            .valueChanges;
    }

    getUserProfileImage(username: string) {
        const getUserProfileImage = gql(`
            query {
                profileImage(username: "${username}"){
                    profileImage
                }
            }
        `);

        return this.apollo
            .watchQuery({
                query: getUserProfileImage
            })
            .valueChanges;
    }

    saveUserProfile(name, bio, imageUrl) {
        const saveProfile = gql(`
            mutation($bio: String!) {
                saveUserProfile(name: "${name}", bio: $bio, imageUrl: "${imageUrl}"){
                    success
                } 
            }
        `);

        return this.apollo
            .mutate({
                mutation: saveProfile,
                variables: {
                    bio: bio
                }
            });
    }
}
