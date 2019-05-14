/* tslint:disable */
import {Component, Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {GeofenceService} from '../../service/geofence/geofence.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage {

    constructor(
        private navCtrl: NavController,
        private geofenceService: GeofenceService
    ) {
        this.geofenceService.init();
    }

    public navigateToLocationList() {
        this.navCtrl.navigateForward('location-list');
    }

    public navigateToRegionList() {
        this.navCtrl.navigateForward('region-list');
    }

    public navigateToWalkList() {
        this.navCtrl.navigateForward('walk-list');
    }
}
