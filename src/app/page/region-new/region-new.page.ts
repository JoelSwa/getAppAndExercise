import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-region-new',
  templateUrl: './region-new.page.html',
  styleUrls: ['./region-new.page.scss'],
})
export class RegionNewPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  private goToHome() {
    this.navCtrl.navigateBack('home');
  }

}
