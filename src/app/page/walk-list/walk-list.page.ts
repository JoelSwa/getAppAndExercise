/*tslint:disable*/
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-walk-list',
    templateUrl: './walk-list.page.html',
    styleUrls: ['./walk-list.page.scss'],
})
export class WalkListPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    public navigateToWalkNew() {
        this.navCtrl.navigateForward('walk-new');
    }

    ngOnInit() {
    }

}
