import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private apollo: Apollo
    ) {
    }

    addGame(name: string, summary: string, developer: string, parentalRating: string, releaseDate: string, coverImage: string){
        const addGame = gql(`
            mutation($summary: String!){
                addGame(
                    name: "${name}",
                    summary: $summary,
                    developer: "${developer}",
                    parentalRating: "${parentalRating}",
                    releaseDate: "${releaseDate}",
                    gameCoverImage: "${coverImage}"){
                        success
                    }
            }
        `);

        return this.apollo
            .mutate({
                mutation: addGame,
                variables: {
                    summary: summary
                }
            });
    }
}
