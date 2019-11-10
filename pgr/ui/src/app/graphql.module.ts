import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpHeaders} from "@angular/common/http";
import {ApolloLink, concat} from "apollo-link";

const uri = 'http://localhost:8000/graphql/'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: new HttpHeaders().set('Authorization',
                localStorage.getItem("token")? `JWT ${localStorage.getItem("token")}` : null)
        });

        return forward(operation);
    });

    const http =
        httpLink.create({
            uri,
            withCredentials: true
        });

    return {
        link: concat(authMiddleware, http),
        cache: new InMemoryCache()
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
