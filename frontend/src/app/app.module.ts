import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Configuration } from './configuration';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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

@NgModule({
  declarations: [
    AppComponent,
    CreatePackageComponent,
    ShowPackagesComponent,
    PackageDetailComponent,
    CompanyPackagesComponent,
    VehiclePackagesComponent,
    InspectorPackagesComponent,
    ScanQRCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ZXingScannerModule.forRoot()
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
