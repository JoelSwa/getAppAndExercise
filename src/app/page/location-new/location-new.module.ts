import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LocationNewPage} from './location-new.page';
import {Geofence} from '@ionic-native/geofence/ngx';
import {GeofenceService} from '../../service/geofence/geofence.service';

const routes: Routes = [
    {
        path: '',
        component: LocationNewPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [LocationNewPage],
    providers: [GeofenceService, Geofence]
})
export class LocationNewPageModule {
}
