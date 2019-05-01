/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceService} from '../../service/geofence/geofence.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(private geofenceService: GeofenceService) {

        this.geofenceService.init();
        // for (let i = 0; i < 3; i++) {
        //     this.items.push({
        //         title: 'Item ' + i,
        //         note: 'This is item #' + i,
        //         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //     });
        // }
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
        this.awaitingResponse = true
        this.geofenceService.addGeofenceTest(this.lat, this.long, 100);
        setTimeout(()=>{
            this.awaitingResponse = false
        }, 1500)
    }


    ngOnInit() {
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}
