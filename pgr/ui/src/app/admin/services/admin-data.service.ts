import {Injectable} from '@angular/core';
import {AdminService} from "./admin.service";
import {BehaviorSubject} from "rxjs";
import {map, skipWhile, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AdminDataService {
    private gameIdBS = new BehaviorSubject<string>(null);
    private gameCoverImageNameBS = new BehaviorSubject<string>(null);

    gameInfo$ = this.gameIdBS
        .pipe(
            skipWhile((id: string)=>id === null),
            switchMap((id: string) => {
                return this.adminService.getGame(id)
            }),
            map((data: any) => {
                return data.data.game;
            })
        );

    gameImage$ = this.gameCoverImageNameBS
        .pipe(
            skipWhile((name: string)=> name === null),
            switchMap((name: string)=>{
                return this.adminService.getGameCoverImage(name);
            }),
            map((response: any)=>{
                return response.data.gameCoverImage.gameCoverImage;
            })
        );

    constructor(
        private adminService: AdminService
    ) {
    }

    setGameId(id: string) {
        this.gameIdBS.next(id);
    }

    setGameCoverImageName(name: string){
        this.gameCoverImageNameBS.next(name);
    }
}
