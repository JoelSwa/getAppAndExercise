/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {GeofenceInstance} from '../../model/geofence-instance';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-walk-new',
    templateUrl: './walk-new.page.html',
    styleUrls: ['./walk-new.page.scss'],
})
export class WalkNewPage implements OnInit {

    constructor(private navCtrl: NavController,
                private http: HttpClient,
                private alertCtrl: AlertController) {
    }

    geofencesFromDatabase: GeofenceInstance[] = [];
    newWalk: GeofenceInstance[] = [];
    private orderChangeDisabled: boolean = true;
    private awaitingResponse: boolean = false;

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
            this.geofencesFromDatabase.push({
                    name: 'Admin test 1',
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                },
                {
                    name: 'Admin test 2',
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                },
                {
                    name: 'Admin test 3',
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                },
                {
                    name: 'Admin test 4',
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                },
                {
                    name: 'Admin test 5',
                    latitude: 1515,
                    longitude: 15215,
                    radius: 142,
                    transition: 3
                }
                );
        }
    }

    private navigateToWalkList() {
        this.navCtrl.navigateBack('walk-list');
    }

    private saveWalk() {
        alert('Upcoming feature');
        // if (!this.awaitingResponse) {
        //     let req = new HttpRequest('POST', 'http://192.168.1.71:8080/walks', {
        //         username: localStorage.getItem('username')
        //     });
        //     setTimeout(() => {
        //         this.awaitingResponse = true;
        //     }, 0);
        //     this.http.request(req).pipe(
        //         timeout(7000),
        //         map((response: any) => {
        //             this.awaitingResponse = false;
        //             return response;
        //         }),
        //         catchError(err => {
        //             this.awaitingResponse = false;
        //             if (err instanceof TimeoutError) {
        //                 alert('Connection to server timed out');
        //                 return throwError('Timeout Exception');
        //             }
        //             return throwError(err);
        //         })
        //     ).subscribe((res: HttpResponse<any>) => {
        //         if (res.status === 201) {
        //             console.log('status === 201');
        //         }
        //         console.log('status !== 200');
        //     }, (error: HttpErrorResponse) => {
        //         if (error.status && error.error) {
        //             alert(error.error);
        //         }
        //         console.error(error);
        //     });
        // }
    }

    private reorderItems(event) {
        const itemMove = this.newWalk.splice(event.detail.from, 1)[0];
        this.newWalk.splice(event.detail.to, 0, itemMove);
        event.detail.complete();
    }

    private async addLocationToWalk(fence: GeofenceInstance, index: number) {
        this.newWalk.push(fence);
        this.geofencesFromDatabase.splice(index, 1);

    }

    private async removeLocationFromWalk(fence, index) {
        this.geofencesFromDatabase.push(fence);
        this.newWalk.splice(index, 1);
        // let alertButtons: AlertButton[] = [
        //     {
        //         text: 'Remove', handler: () => {
        //             this.geofencesFromDatabase.push(fence);
        //             this.newWalk.splice(index, 1);
        //         }
        //     },
        //     {text: 'Cancel'}];
        // let alertTest = await this.alertCtrl.create({header: 'Remove', message: 'Do you want to remove ' + fence.name + "?", buttons: alertButtons});
        // await alertTest.present();
    }

    private testNewWalkList() {
        let number: number = 1;
        this.newWalk.forEach((fence) => {
            console.log('Fence ' + number + ': ' + fence.name);
            number++;
        });
    }

    private changeOrder() {
        setTimeout(() => {
            this.orderChangeDisabled = this.orderChangeDisabled ? false : true;
        }, 0);
    }
}
