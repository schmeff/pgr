import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);

        return (invalidCtrl || invalidParent);
    }
}
