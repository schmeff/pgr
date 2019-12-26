import {Injectable} from '@angular/core';
import {AdminService} from "./admin.service";
import {BehaviorSubject, Subject} from "rxjs";
import {map, skipWhile, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AdminDataService {
    private gameIdBS = new BehaviorSubject<string>(null);
    private gameCoverImageNameBS = new BehaviorSubject<string>(null);
    private criticReviewsBS = new BehaviorSubject<any[]>([]);

    criticReviews$ = this.criticReviewsBS.asObservable();

    gameInfo$ = this.gameIdBS
        .pipe(
            skipWhile((id: string) => id === null),
            switchMap((id: string) => {
                return this.adminService.getGame(id)
            }),
            map((data: any) => {
                return data.data.game;
            })
        );

    gameImage$ = this.gameCoverImageNameBS
        .pipe(
            skipWhile((name: string) => name === null),
            switchMap((name: string) => {
                return this.adminService.getGameCoverImage(name);
            }),
            map((response: any) => {
                return response.data.gameCoverImage.gameCoverImage;
            })
        );


    constructor(
        private adminService: AdminService
    ) {
        this.gameIdBS
            .pipe(
                skipWhile((id: string) => id === null),
                switchMap((gameId: string) => {
                    return this.adminService.getCriticReviews(gameId)
                }),
                map((response: any) => {
                    return response.data.allCriticReviews.edges.map((obj: any) => {
                        return obj.node;
                    });
                })
            )
            .subscribe((reviews: any) => {
                this.criticReviewsBS.next(reviews);
            });
    }

    setGameId(id: string) {
        this.gameIdBS.next(id);
    }

    setGameCoverImageName(name: string) {
        this.gameCoverImageNameBS.next(name);
    }

    addCriticReview(name: string, rating: number, gameId: string, link: string) {
        return this.adminService.addCriticReview(name, rating, gameId, link)
            .pipe(
                map((response: any) => {
                    let reviews = this.criticReviewsBS.getValue().concat({
                        id: response.data.addCriticReview.reviewId,
                        name: name,
                        rating: rating,
                        link: link
                    });

                    this.criticReviewsBS.next(reviews);

                    return response;
                })
            )
    }

    editCriticReview(name: string, rating: number, link: string, reviewId: string) {
        return this.adminService.editCriticReview(reviewId, name, rating, link)
            .pipe(
                map((response: any) => {
                    let reviews = this.criticReviewsBS.getValue();
                    reviews.forEach((review) => {
                        if (reviewId === review.id) {
                            review.name = name;
                            review.rating = rating;
                            review.link = link;
                            return;
                        }
                    });
                    this.criticReviewsBS.next(reviews);

                    return response.data.editCriticReview.success;
                })
            )
    }

    deleteCriticReview(reviewId: string) {
        return this.adminService.deleteCriticReview(reviewId)
            .pipe(
                map((response: any) => {
                    if (response.data.deleteCriticReview.success) {
                        let filtered = this.criticReviewsBS.getValue().filter((review) => {
                            return review.id != reviewId;
                        });
                        this.criticReviewsBS.next(filtered);

                        return true;
                    }
                })
            )
    }
}
