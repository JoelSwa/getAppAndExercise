/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceInstance} from '../../model/geofence-instance';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-walk-new',
    templateUrl: './walk-new.page.html',
    styleUrls: ['./walk-new.page.scss'],
})
export class WalkNewPage implements OnInit {

    constructor(private navCtrl: NavController,
                private http: HttpClient) {
    }

    geofencesFromDatabase: GeofenceInstance[] = [];
    geofenceCollection: GeofenceInstance[] = [];
    private awaitingResponse: boolean = false;
    private walkNameInput: string = '';
    private geofencesAdded: boolean = false;

    ngOnInit() {
        if (localStorage.getItem('username') !== 'admin') {
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
                        console.log('status === 200');
                        this.geofencesFromDatabase = res.body;
                        console.log('Geofences fetched from server');
                    }
                    console.log('status !== 200');
                }, (error: HttpErrorResponse) => {
                    if (error.status && error.error) {
                        alert(error.error);
                    }
                    console.error(error);
                });
            }
        } else {
            //ONLY FOR OFFLINE TESTING PURPOSES
            for (let i = 0; i < 5; i++) {
                this.geofencesFromDatabase.push({
                    id: i,
                    name: 'Test location ' + i,
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                });
            }
        }
    }

    private checkIfAddedGeofences() {
        if (this.geofenceCollection.length > 0) {
            this.geofencesAdded = true;
            return;
        }
        this.geofencesAdded = false;
    }

    private navigateToWalkList() {
        this.navCtrl.navigateBack('walk-list');
    }

    private saveWalk() {
        if (!this.awaitingResponse) {
            let req = new HttpRequest('POST', 'http://192.168.1.71:8080/walks', {
                username: localStorage.getItem('username'),
                name: this.walkNameInput,
                geofenceCollection: this.geofenceCollection
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
                    alert('Walk added');
                    this.navCtrl.navigateBack('walk-list');
                    console.log('status === 201');
                }
                console.log('status !== 200');
            }, (error: HttpErrorResponse) => {
                if (error.status && error.error) {
                    alert(error.error);
                }
                console.error(error);
            });
        }
    }

    private reorderItems(event) {
        const itemMove = this.geofenceCollection.splice(event.detail.from, 1)[0];
        this.geofenceCollection.splice(event.detail.to, 0, itemMove);
        event.detail.complete();
    }

    private async addLocationToWalk(fence: GeofenceInstance, index: number) {
        this.geofenceCollection.push(fence);
        this.geofencesFromDatabase.splice(index, 1);
        this.checkIfAddedGeofences();

    }

    private async removeLocationFromWalk(fence, index) {
        this.geofencesFromDatabase.push(fence);
        this.geofenceCollection.splice(index, 1);
        this.checkIfAddedGeofences();
    }
}
