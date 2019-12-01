import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {HomeModule} from "./home/home.module";
import {NavigationModule} from "./navigation/navigation.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        GraphQLModule,
        HttpClientModule,
        HomeModule,
        NavigationModule,
        AdminModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
