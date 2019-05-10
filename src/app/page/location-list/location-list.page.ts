/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {GeofenceInstance} from '../../model/geofence-instance';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.page.html',
    styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {

    constructor(
        private navCtrl: NavController,
        private http: HttpClient
    ) {
    }

    awaitingResponse: boolean = false;

    geofencesFromDatabase: GeofenceInstance[];

    navigateToLocationNew() {
        this.navCtrl.navigateForward('location-new');
    }

    getItems(){
        if (!this.awaitingResponse) {
            let req = new HttpRequest('POST', 'http://192.168.1.71:8080/geofences/all', {
                username: localStorage.getItem('username')
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
                if (res.status === 200) {
                    console.log("status === 200")
                    this.geofencesFromDatabase = res.body
                    console.log("Geofences fetched from server")
                }
                console.log("status !== 200")
            }, (error: HttpErrorResponse) => {
                if (error.status && error.error) {
                    alert(error.error);
                }
                console.error(error);
            });
        }
    }

    private reorderItems(event){
        const itemMove = this.geofencesFromDatabase.splice(event.detail.from, 1)[0];
        this.geofencesFromDatabase.splice(event.detail.to, 0, itemMove);
        event.detail.complete();
    }

    ngOnInit() {
    }
}
