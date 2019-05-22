/* tslint:disable*/
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.page.html',
    styleUrls: ['./region-list.page.scss'],
})
export class RegionListPage {

    constructor(
        private navCtrl: NavController) {
    }

    private goToHome() {
        this.navCtrl.navigateBack('home');
    }

    public navigateToRegionNew() {
        this.navCtrl.navigateForward('region-new');
    }
}
