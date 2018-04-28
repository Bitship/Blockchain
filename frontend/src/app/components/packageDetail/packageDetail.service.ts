import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { Package, Customer } from '../../org.bitship';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';

import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Rx';
const WS_URL = 'ws://localhost:3000';

@Injectable()
export class PackageDetailService {
    private NAMESPACE = 'org.bitship.Package';
    constructor(
        private http: Http,
        // private socket: Socket,
        private wsService: WebsocketService,
        private dataService: DataService<Package>,
        private customerService: DataService<Customer>,
    ) {
    };

    public getSingle(id: string): Observable<Package> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public getSingleCustomer(customerId: string): Observable<Customer> {
        return this.customerService.getSingle('org.bitship.Customer', customerId)
    }

    public async getDetails(packageBarcode: string): Promise<{pkg: any, sender: any}> {
        const pkg: any = await this.getSingle(packageBarcode).toPromise()
        const senderId = pkg.sender.split('#')[1]
        const sender = await this.getSingleCustomer(senderId).toPromise()
        return {pkg, sender}
    }

    public getHistory(packageId: string): Observable<Package[]> {
        return this.http.get(`http://localhost:4000/packages/${packageId}/transfer_history`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public watchHistory() {
        return <Subject<any>>this.wsService
            .connect(WS_URL)
            .map((response: MessageEvent): any => {
                const data = JSON.parse(response.data)
                return data
            })
            .filter((data) => data.$class === 'org.bitship.ShipmentTransfered')
            .map(data => data.package)
    }

    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }
}
