import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private apollo: Apollo
    ) {
    }

    searchGames(queryString: string) {
        const allGames = gql(`
        query{
                allGames(name_Icontains: "${queryString}"){
                    edges{
                        node{
                            id,
                            name
                        }
                    }
                }
            }
      `);

        return this.apollo
            .watchQuery({
                query: allGames
            })
            .valueChanges;
    }
}
