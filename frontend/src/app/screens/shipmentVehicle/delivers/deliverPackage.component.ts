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
    private selectedDevice: any
    private message = ''
    private scannerEnabled = true
    private package: any
    private sender: any

    constructor(
        private packageDetailService: PackageDetailService,
        private shipmentDeliverService: ShipmentDeliverService,
        private location: Location
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

    async confirmDelivered() {
        await this.shipmentDeliverService.postShipmentDeliver(this.package.barcode)
        this.scannerEnabled = false
        this.package = null
        this.sender = null
    }

    back() {
        this.location.back();
    }
}




