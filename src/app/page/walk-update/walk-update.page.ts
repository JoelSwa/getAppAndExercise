/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceInstance} from '../../model/geofence-instance';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {NavController} from '@ionic/angular';
import {WalkService} from '../../service/walk/walk.service';
import {WalkInstance} from '../../model/walk-instance';

@Component({
    selector: 'app-walk-update',
    templateUrl: './walk-update.page.html',
    styleUrls: ['./walk-update.page.scss'],
})
export class WalkUpdatePage implements OnInit {

    constructor(private http: HttpClient,
                private navCtrl: NavController,
                private walkService: WalkService) {
    }

    geofencesFromDatabase: GeofenceInstance[] = [];
    geofenceCollection: GeofenceInstance[] = [];
    private awaitingResponse: boolean = false;
    private walkNameInput: string = '';
    private geofencesAdded: boolean = false;
    private activeWalk: WalkInstance;

    ngOnInit() {
        if (this.walkService.getActiveWalk()) {
            this.activeWalk = this.walkService.getActiveWalk();
            this.walkNameInput = this.activeWalk.name;
            this.geofenceCollection = this.activeWalk.geofences;
            this.checkIfAddedGeofences();
            this.getAllGeofencesForUser();
        } else {
            alert('Error: walk not found. Redirecting to Walk list');
            this.navCtrl.navigateBack('walk-list');
        }
    }

    private getAllGeofencesForUser() {
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
                        if (this.activeWalk.geofences.length > 0) {
                            this.removeAddedLocationsFromDatabaseList(this.activeWalk.geofences);
                        }
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

    private goToHome() {
        this.navCtrl.navigateBack('home');
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
            let req = new HttpRequest('PUT', 'http://192.168.1.71:8080/walks', {
                username: localStorage.getItem('username'),
                id: this.activeWalk.id,
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
                if (res.status === 200) {
                    alert('Walk updated');
                    this.navCtrl.back();
                    console.log('status === 200');
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

    private removeAddedLocationsFromDatabaseList(geofences: GeofenceInstance[]) {
        for (let fence of geofences) {
            for (let i = 0; i < this.geofencesFromDatabase.length; i++) {
                if (fence.id === this.geofencesFromDatabase[i].id) {
                    this.geofencesFromDatabase.splice(i, 1);
                    break;
                }
            }
        }
    }
}
