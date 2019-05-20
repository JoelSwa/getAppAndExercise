/*tslint:disable*/
import {Component, OnInit} from '@angular/core';
import {WalkInstance} from '../../model/walk-instance';
import {WalkService} from '../../service/walk/walk.service';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {GeofenceService} from '../../service/geofence/geofence.service';

@Component({
    selector: 'app-walk-info',
    templateUrl: './walk-info.page.html',
    styleUrls: ['./walk-info.page.scss'],
})
export class WalkInfoPage implements OnInit {

    constructor(private walkService: WalkService,
                private navCtrl: NavController,
                private http: HttpClient,
                private geofenceService: GeofenceService) {
    }

    private walk: WalkInstance;
    private awaitingResponse: boolean = false

    ngOnInit() {
        if (this.walkService.getActiveWalk()) {
            this.walk = this.walkService.getActiveWalk();
            if (!this.awaitingResponse) {
                let req = new HttpRequest('POST', 'http://192.168.1.71:8080/geofences/walk', {
                    username: localStorage.getItem('username'),
                    name: this.walk.name
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
                        this.walk.geofences = res.body
                        this.walkService.setActiveWalk(this.walk)
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
        } else {
            alert('Error: walk not found');
            this.navCtrl.navigateBack('walk-list');
        }
    }

    private startFixedTurnWalk() {
        this.geofenceService.startFixedTurnWalk(this.walk)
    }

    private startShuffledWalk() {
        this.geofenceService.startShuffledWalk(this.walk)
    }

    private navigateToWalkList() {
        this.walkService.setActiveWalk(null);
        this.navCtrl.navigateBack('walk-list');
    }

    private navigateToWalkUpdate(){
        this.navCtrl.navigateForward('walk-update')
    }
}
