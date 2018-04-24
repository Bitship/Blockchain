import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CreatePackageComponent } from './screens/sender/createPackage/createPackage.component';
import { ShowPackagesComponent } from './screens/sender/packages/showPackages.component';
import { PackageDetailComponent } from './components/packageDetail/packageDetail.component';

const routesConfig: Routes = [
    { path: 'sender/package/create', component: CreatePackageComponent},
    { path: 'sender/packages', component: ShowPackagesComponent},
    { path: 'packageDetail', component: PackageDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routesConfig)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}

