import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalkInfoPage } from './walk-info.page';
import {GeofenceService} from '../../service/geofence/geofence.service';
import {Geofence} from '@ionic-native/geofence/ngx';

const routes: Routes = [
  {
    path: '',
    component: WalkInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WalkInfoPage],
  providers: [GeofenceService, Geofence]
})
export class WalkInfoPageModule {}
