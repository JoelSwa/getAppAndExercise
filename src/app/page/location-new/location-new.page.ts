/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceService} from '../../service/geofence/geofence.service';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';

@Component({
    selector: 'app-location-new',
    templateUrl: './location-new.page.html',
    styleUrls: ['./location-new.page.scss'],
})
export class LocationNewPage implements OnInit {

    constructor(
        private geofenceService: GeofenceService,
        private http: HttpClient) {
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
        if(localStorage.getItem("username")){
            console.log("localStorage Username : " + localStorage.getItem("username"))
            if (!this.awaitingResponse) {
                let req = new HttpRequest('POST', 'http://192.168.1.71:8080/geofences', {
                    latitude: this.lat,
                    longitude: this.long,
                    radius: 100,
                    username: localStorage.getItem("username")
                });
                setTimeout(() => {
                    this.awaitingResponse = true;
                }, 0);
                this.http.request(req).pipe(
                    timeout(7000),
                    map((response: any) => {
                        this.awaitingResponse = false;
                        return response;
                    }),
                    catchError(err => {
                        this.awaitingResponse = false;
                        if (err instanceof TimeoutError) {
                            alert('Connection to server timed out');
                            return throwError('Timeout Exception');
                        }
                        return throwError(err);
                    })
                ).subscribe((res: HttpResponse<any>) => {
                    if (res.status === 201) {
                        alert("Geofence added!")
                    }
                }, (error: HttpErrorResponse) => {
                    if (error.status && error.error) {
                        alert(error.error);
                    }
                    console.error(error);
                });

                // ************************************************************************************************

            }
        }

    }

    private checkLocalStorage(){
        if(localStorage.getItem("username")){
            alert("Logged in as " + localStorage.getItem("username"))
        } else{
            alert("Not logged in according to storage")
        }

    }

    ngOnInit() {
    }

}
