import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CreatepackageComponent } from './createpackage/createpackage.component';
import { SearchpackageComponent } from './searchpackage/searchpackage.component';
import { PackagedetailComponent } from './packagedetail/packagedetail.component';
import { CheckshipperComponent } from './checkshipper/checkshipper.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routesConfig: Routes = [
    { path: 'create', component: CreatepackageComponent},
    { path: 'search', component: SearchpackageComponent},
    { path: 'detail', component: PackagedetailComponent},
    { path: 'check', component: CheckshipperComponent},
    { path: '', redirectTo: '/check', pathMatch: 'full'},
    { path: '**', component: PagenotfoundComponent}   
];

@NgModule({
    imports: [RouterModule.forRoot(routesConfig)],
    declarations: [
        CreatepackageComponent,
        SearchpackageComponent,
        PackagedetailComponent,
        CheckshipperComponent,
        PagenotfoundComponent
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}

