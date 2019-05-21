/*tslint:disable*/
import {Component, OnInit} from '@angular/core';
import {GeofenceInstance} from '../../model/geofence-instance';
import {NavController} from '@ionic/angular';
import {GeofenceInstanceService} from '../../service/geofence/geofence-instance.service';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';

@Component({
    selector: 'app-location-info',
    templateUrl: './location-info.page.html',
    styleUrls: ['./location-info.page.scss'],
})
export class LocationInfoPage implements OnInit {

    constructor(private navCtrl: NavController,
                private geofenceInstanceService: GeofenceInstanceService,
                private http: HttpClient) {
    }

    private geofence: GeofenceInstance;
    private awaitingResponse: boolean = false;
    private id: number;
    private name: string = '';
    private lat: number;
    private long: number;
    private radius: number;

    ngOnInit() {
        if (this.geofenceInstanceService.getSingleGeofenceInfo()) {
            this.geofence = this.geofenceInstanceService.getSingleGeofenceInfo();
            this.id = this.geofence.id;
            this.name = this.geofence.name;
            this.lat = this.geofence.latitude;
            this.long = this.geofence.longitude;
            this.radius = this.geofence.radius;
        } else {
            alert('Error: Geofence not found. Returning to Location List');
            this.navCtrl.navigateBack('location-list');
        }
    }

    private goToHome() {
        this.navCtrl.navigateBack('home');
    }

    private onEnterClick(event) {
        //TODO: Make sure the right fields get focus when user clicks "Enter"
    }

    private saveGeofence() {
        if (localStorage.getItem('username')) {
            if (!this.awaitingResponse) {
                if (this.name && this.lat && this.long && this.radius) {
                    let req = new HttpRequest('PUT', 'http://192.168.1.71:8080/geofences', {
                        username: localStorage.getItem('username'),
                        id: this.id,
                        name: this.name,
                        latitude: this.lat,
                        longitude: this.long,
                        radius: this.radius,
                        transition: 1
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
                            alert('Location updated!');
                            this.navCtrl.navigateBack('location-list');
                        }
                    }, (error: HttpErrorResponse) => {
                        if (error.status && error.error) {
                            alert(error.error);
                        }
                        console.error(error);
                    });
                } else {
                    alert('No field can be empty');
                }
            }
        } else {
            alert('Was not able to authenticate user');
            this.navCtrl.navigateRoot('login');
        }
    }

    private navigateToLocationList() {
        this.navCtrl.navigateBack('location-list');
    }

    private deleteGeofence() {
        if (localStorage.getItem('username')) {
            if (!this.awaitingResponse) {
                if (this.name && this.lat && this.long && this.radius) {
                    let req = new HttpRequest('PUT', 'http://192.168.1.71:8080/geofences/delete', {
                        username: localStorage.getItem('username'),
                        id: this.geofence.id
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
                        if (res.status === 204) {
                            alert('Location deleted!');
                            this.navCtrl.navigateBack('location-list');
                        }
                    }, (error: HttpErrorResponse) => {
                        if (error.status && error.error) {
                            alert(error.error);
                        }
                        console.error(error);
                    });
                } else {
                    alert('No field can be empty');
                }
            }
        } else {
            alert('Was not able to authenticate user');
            this.navCtrl.navigateRoot('login');
        }
    }
}
