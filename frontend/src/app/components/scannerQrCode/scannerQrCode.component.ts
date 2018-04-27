import { Component, VERSION, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
    selector: 'scan-qr-code',
    styleUrls: ['./scannerQrCode.component.css'],
    templateUrl: 'scannerQrCode.component.html',
})
export class ScanQRCodeComponent implements OnInit {

    ngVersion = VERSION.full;

    @ViewChild('scanner')
    scanner: ZXingScannerComponent;

    hasCameras = false;
    qrResultString: string;
    qrResult: Result;
    scannerEnabled = true;

    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;
    barcode: Array<string> = [];

    @Output() onScanPackages = new EventEmitter<Array<string>>();

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;
            // selects the devices's back camera by default
            for (const device of devices) {
                if (/back|rear|environment/gi.test(device.label)) {
                    this.scanner.changeDevice(device);
                    this.selectedDevice = device;
                    break;
                }
            }
        });
        this.scanner.scanComplete.subscribe((result: Result) => {
            this.qrResult = result;
        });
    }
    displayCameras(cameras: MediaDeviceInfo[]) {
        console.log('Devices: ', cameras);
        this.availableDevices = cameras;
    }

    handleQrCodeResult(resultString: string) {
        console.log('Result: ', resultString);
        if (!this.qrResultString) {
            this.qrResultString = '';
        }
        this.qrResultString += ' ---- ' + resultString;
        this.barcode.push(resultString);
    }

    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }
    done() {
        this.onScanPackages.emit(this.barcode);
    }
}
