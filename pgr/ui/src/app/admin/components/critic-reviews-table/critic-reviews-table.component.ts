import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {AddCriticReviewDialogComponent} from "../add-critic-review-dialog/add-critic-review-dialog.component";
import {AdminDataService} from "../../services/admin-data.service";
import {DeleteCriticReviewDialogComponent} from "../delete-critic-review-dialog/delete-critic-review-dialog.component";

@Component({
    selector: 'pgr-critic-reviews-table',
    templateUrl: './critic-reviews-table.component.html',
    styleUrls: ['./critic-reviews-table.component.scss']
})
export class CriticReviewsTableComponent implements OnInit {
    @Input()
    gameId: string;

    criticReviews$ = this.adminDataService.criticReviews$;

    displayedColumns: string[] = ['name', 'rating', 'actions'];

    constructor(
        public dialog: MatDialog,
        private adminDataService: AdminDataService
    ) {
    }

    ngOnInit() {
    }

    openAddCriticReviewDialog(review?: any) {
        this.dialog.open(AddCriticReviewDialogComponent, {
            width: '50%',
            data: {
                gameId: this.gameId,
                review: review
            }
        });
    }

    openDeleteCriticReviewDialog(review) {
        this.dialog.open(DeleteCriticReviewDialogComponent, {
            width: '300px',
            data: {
                id: review.id
            }
        });
    }
}
