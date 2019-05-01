import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import {MapComponent} from '../map/map.component';
import {GeofenceService} from '../service/geofence/geofence.service';
import {Geofence} from '@ionic-native/geofence/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ]),
  ],
  declarations: [ListPage, MapComponent],
  providers: [GeofenceService, Geofence]
})
export class ListPageModule {}
