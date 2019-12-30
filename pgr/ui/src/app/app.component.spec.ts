import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GraphQLModule} from "./graphql.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "./home/home.module";
import {NavigationModule} from "./navigation/navigation.module";
import {AdminModule} from "./admin/admin.module";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
                AdminModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
