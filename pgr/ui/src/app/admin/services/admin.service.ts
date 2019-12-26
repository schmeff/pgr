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

    addCriticReview(name: string, rating: number, gameId: string, link: string){
        const addCriticReview = gql(`
            mutation{
                addCriticReview(name: "${name}", rating: ${rating}, gameId: "${gameId}", link: "${link}"){
                    reviewId
                }
            }
        `);

        return this.apollo.mutate({
            mutation: addCriticReview
        });
    }

    editCriticReview(reviewId: string, name: string, rating: number, link: string){
        const editCriticReview = gql(`
            mutation{
                editCriticReview(reviewId: "${reviewId}", name: "${name}", rating: ${rating}, link: "${link}"){
                    success
                }
            }
        `);

        return this.apollo.mutate({
            mutation: editCriticReview
        });
    }

    deleteCriticReview(reviewId: string){
        const deleteCriticReview = gql(`
            mutation{
                deleteCriticReview(reviewId: "${reviewId}"){
                    success
                }
            }
        `);

        return this.apollo.mutate({
            mutation: deleteCriticReview
        });
    }

    getCriticReviews(gameId: string){
        const getCriticReviews = gql(`
            query{
                allCriticReviews(game: "${gameId}"){
                    edges{
                        node{
                            id,
                            name,
                            rating,
                            link
                        }
                    }
                }
            }
        `);

        return this.apollo.watchQuery({
            query: getCriticReviews
        }).valueChanges;
    }
}
