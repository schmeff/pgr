import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor() {
    }

    resizeImage(source: any, dataURLBS: BehaviorSubject<any>) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();

        img.onload = function () {
            let sourceDest = 0;
            let sourceDim = 0;
            if (img.height > img.width) {
                canvas.width = 200;
                canvas.height = 200;
                sourceDest = img.width / 2;
                sourceDim = img.width;
            } else {
                canvas.height = 200;
                canvas.width = 200;
                sourceDest = img.height / 2;
                sourceDim = img.height;
            }
            let imgCanvas = document.createElement("canvas");
            let imgCtx = imgCanvas.getContext("2d");
            imgCanvas.height = sourceDim;
            imgCanvas.width = sourceDim;

            imgCtx.drawImage(img, img.width/2 - sourceDest, img.height/2 - sourceDest, sourceDim, sourceDim,
                0, 0, imgCanvas.width, imgCanvas.height);

            ctx.drawImage(imgCanvas, 0, 0, imgCanvas.width, imgCanvas.height, 0, 0, canvas.width, canvas.height);

            dataURLBS.next(canvas.toDataURL("image/png"));
        };

        img.src = source;
    }

}
