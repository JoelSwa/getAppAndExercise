/* tslint:disable*/
import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.page.html',
  styleUrls: ['./region-list.page.scss'],
})
export class RegionListPage implements OnInit {

  constructor(
      private navCtrl: NavController
  ) {}

  ngOnInit() {
    //hämta data från databasen här kanske
  }

  public navigateToRegionNew(){
    this.navCtrl.navigateForward('region-new')
  }

}
