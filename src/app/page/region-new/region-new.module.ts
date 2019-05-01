import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegionNewPage } from './region-new.page';
import {MapComponent} from '../../component/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: RegionNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegionNewPage, MapComponent]
})
export class RegionNewPageModule {}
