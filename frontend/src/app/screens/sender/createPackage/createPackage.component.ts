import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PackageService } from '../../../services/package.service';

@Component({
    selector: 'app-createPackage',
    templateUrl: './createPackage.component.html',
    styleUrls: ['./createPackage.component.css'],
    providers: [PackageService]
})
export class CreatePackageComponent implements OnInit {

    myForm: FormGroup;
    private asset;

    barcode = new FormControl("", Validators.required);
    receiverAddress = new FormControl("", Validators.required);
    receiverPhone = new FormControl("", Validators.required);
    receiverName = new FormControl("", Validators.required);
    weight = new FormControl("", Validators.required);

    constructor(private packageService: PackageService, fb: FormBuilder) {
        this.myForm = fb.group({
            barcode: this.barcode,
            receiverAddress: this.receiverAddress,
            receiverPhone: this.receiverPhone,
            receiverName: this.receiverName,
            weight: this.weight
        });
    };
    ngOnInit() {
    }

    addAsset(form: any): Promise<any> {
        this.asset = {
            $class: "org.bitship.Package",
            "sender": "tam1",
            "barcode": this.barcode.value,
            "weight": this.weight.value,
            "status": "PENDING",
            "receiverAddress": this.receiverAddress.value,
            "receiverPhone": this.receiverPhone.value,
            "receiverName": this.receiverName.value
        }
        return this.packageService.addAsset(this.asset)
            .toPromise()
            .catch((error) => {
                console.error(error);
            });
    }
}
