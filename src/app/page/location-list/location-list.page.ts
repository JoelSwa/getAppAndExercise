/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  navigateToLocationNew(){
    this.navCtrl.navigateForward("location-new")
  }

  ngOnInit() {
  }

}
