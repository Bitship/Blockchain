import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Configuration } from './configuration';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebcamModule } from 'ngx-webcam';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePackageComponent } from './screens/sender/createPackage/createPackage.component';
import { ShowPackagesComponent } from './screens/sender/packages/showPackages.component';
import { PackageDetailComponent } from './components/packageDetail/packageDetail.component';
import { CompanyPackagesComponent} from './screens/shipmentCompany/packages/companyPackages.component';
import { VehiclePackagesComponent } from './screens/shipmentVehicle/packages/vehiclePackages.component';
import { InspectorPackagesComponent } from './screens/inspector/inspectorPackages/inspectorPackages.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanQRCodeComponent } from './components/scannerQrCode/scannerQrCode.component';
import { DeliverPackageComponent } from './screens/shipmentVehicle/delivers/deliverPackage.component';

import { NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
@NgModule({
  declarations: [
    AppComponent,
    CreatePackageComponent,
    ShowPackagesComponent,
    PackageDetailComponent,
    CompanyPackagesComponent,
    VehiclePackagesComponent,
    InspectorPackagesComponent,
    ScanQRCodeComponent,
    DeliverPackageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ZXingScannerModule.forRoot(),
    WebcamModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
  ],
  providers: [
    Configuration,
    DataService,
    NbSidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
