import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'pgr-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    username: string = localStorage.getItem('username');

    constructor() {
    }

    ngOnInit() {
    }

}
