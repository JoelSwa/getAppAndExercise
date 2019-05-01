/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceService} from '../../service/geofence/geofence.service';

@Component({
    selector: 'app-location-new',
    templateUrl: './location-new.page.html',
    styleUrls: ['./location-new.page.scss'],
})
export class LocationNewPage implements OnInit {

    constructor(private geofenceService: GeofenceService) {
    }

    private lat: number;
    private long: number;
    private awaitingResponse: boolean = false;


    public onEnterClick(event) {
        if (event.key === 'Enter') {
            let latField = <HTMLIonInputElement> document.getElementById('lat');
            let longField = <HTMLIonInputElement> document.getElementById('long');
            let save = <HTMLIonButtonElement> document.getElementById('save');

            if (this.lat) {
                if (this.long) {
                    this.focusOut();
                    save.click();
                    return;
                }
                longField.setFocus();
                return;
            }

            if (this.long) {
                if (this.lat) {
                    this.focusOut();
                    save.click();
                    return;
                }
                latField.setFocus();
                return;
            }
        }
    }

    private focusOut() {
        let activeElement = <HTMLIonInputElement> document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    }

    private saveGeofence() {
        this.awaitingResponse = true;
        this.geofenceService.addGeofenceTest(this.lat, this.long, 100);
        setTimeout(() => {
            this.awaitingResponse = false;
        }, 1500);
    }

    ngOnInit() {
    }

}
