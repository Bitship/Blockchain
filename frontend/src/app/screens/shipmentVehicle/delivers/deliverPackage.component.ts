import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { Router } from '@angular/router';
import { ShipmentVehicleService } from '../../../services/shipmentVehicle.service';
import { PackageBarcode } from '../../../org.bitship';
import { ShipmentTransferService } from '../../../services/shipmentTransfer.service';
import { Location } from '@angular/common';
import { PackageDetailService } from '../../../components/packageDetail/packageDetail.service';
import { WebsocketService } from '../../../components/packageDetail/websocket.service';
import { ShipmentDeliverService } from '../../../services/shipmentDeliver.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'
import {WebcamImage} from 'ngx-webcam';
import * as ipfsAPI from 'ipfs-api'
import { ActivatedRoute } from '@angular/router';

const ipfs = ipfsAPI('localhost', '5001')

declare const Buffer

@Component({
    selector: 'app-showPackages',
    templateUrl: './deliverPackage.component.html',
    styleUrls: ['./deliverPackage.component.css'],
    providers: [
        PackageDetailService,
        WebsocketService,
        ShipmentDeliverService,
    ]
})
export class DeliverPackageComponent implements OnInit {
    private trigger: Subject<void> = new Subject<void>();
    private selectedDevice: any
    private message = ''
    private scannerEnabled = true
    private package: any
    private sender: any
    private showDeliveryConfirmedMsg = false
    private saving = false

    constructor(
        private packageDetailService: PackageDetailService,
        private shipmentDeliverService: ShipmentDeliverService,
        private location: Location,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
    }

    displayCameras(devices) {
        if (devices.length === 0) {
            this.message = 'no camera found'
            console.error('no camera found')
            return
        }
        console.log('using device: ', devices[0])
        this.selectedDevice = devices[0]
    }

    async onScannedPackages(barcodes: Array<string>) {
        if (barcodes.length === 0) {
            return
        }

        this.scannerEnabled = false
        console.log('barcodes: ', barcodes)

        const {pkg, sender} = await this.packageDetailService.getDetails(barcodes[0])
        console.log({pkg, sender})
        this.package = pkg
        this.sender = sender
    }

    onTestScannerKey(event) {
        if (event.keyCode === 13) {
            this.onScannedPackages([event.target.value])
            return
        }
    }

    // async confirmDelivered() {
    //     await this.shipmentDeliverService.postShipmentDeliver(this.package.barcode)

    //     this.showDeliveryConfirmedMsg = true
    //     await this.sleep(2000)

    //     this.scannerEnabled = true
    //     this.package = null
    //     this.sender = null
    //     this.showDeliveryConfirmedMsg = false
    // }

    public async handleImage(webcamImage: WebcamImage) {
        this.saving = true

        console.log('received webcam image', webcamImage);
        const buffer = Buffer.from(webcamImage.imageAsBase64, 'base64')
        const resp = await ipfs.add(buffer)
        const imageId = resp[0].hash
        console.log('imageId', imageId)

        const params = await this.route.params.first().toPromise()
        const vehicleId = params.vehicleId

        await this.shipmentDeliverService.postShipmentDeliver(vehicleId, this.package.barcode, imageId)

        this.saving = false
        this.showDeliveryConfirmedMsg = true
        await this.sleep(2000)

        this.scannerEnabled = true
        this.package = null
        this.sender = null
        this.showDeliveryConfirmedMsg = false
    }

    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }

    back() {
        this.location.back();
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}




