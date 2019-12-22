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

    addGame(name: string, summary: string, developer: string, parentalRating: string, releaseDate: string, coverImage: string) {
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

    editGame(id: string, name: string, summary: string, developer: string, parentalRating: string, releaseDate: string, coverImage: string, coverImageUpdated: boolean){
        const editGame = gql(`
            mutation($summary: String!){
                editGame(
                    gameId: "${id}",
                    name: "${name}",
                    summary: $summary,
                    developer: "${developer}",
                    parentalRating: "${parentalRating}",
                    releaseDate: "${releaseDate}",
                    gameCoverImage: "${coverImage}",
                    gameCoverImageUpdated: ${coverImageUpdated}
                ){
                    success
                }
            }
        `);

        return this.apollo
            .mutate({
                mutation: editGame,
                variables: {
                    summary: summary
                }
            });
    }

    getGame(id: string) {
        const getGame = gql(`
            query{
               game(id: "${id}"){
                    id,
                    name,
                    summary,
                    developer,
                    parentalRating,
                    releaseDate,
                    gameCoverImage
               } 
            }
        `);

        return this.apollo.watchQuery({
            query: getGame
        }).valueChanges;
    }

    getGameCoverImage(gameCoverImageName) {
        const getGameCoverImage = gql(`
            query{
                gameCoverImage(gameCoverImageName: "${gameCoverImageName}"){
                    gameCoverImage
                }
            }
        `);

        return this.apollo.watchQuery({
            query: getGameCoverImage
        }).valueChanges;
    }
}
