/*tslint:disable*/
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {WalkInstance} from '../../model/walk-instance';
import {WalkService} from '../../service/walk/walk.service';

@Component({
    selector: 'app-walk-list',
    templateUrl: './walk-list.page.html',
    styleUrls: ['./walk-list.page.scss'],
})
export class WalkListPage implements OnInit {

    constructor(private navCtrl: NavController,
                private http: HttpClient,
                private walkService: WalkService) {
    }

    private walksFromDatabase: WalkInstance[];
    private awaitingResponse: boolean = false;

    public navigateToWalkNew() {
        this.navCtrl.navigateForward('walk-new');
    }

    ngOnInit() {
        this.getWalks()
    }

    private getWalks(){
        if (!this.awaitingResponse) {
            let req = new HttpRequest('POST', 'http://192.168.1.71:8080/walks/all', {
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
                    this.walksFromDatabase = res.body;
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
    }

    private goToWalk(walk: WalkInstance) {
        this.walkService.setActiveWalk(walk)
        this.navCtrl.navigateForward("walk-info")
    }

    private async doRefresh(event){
        this.getWalks()
        event.target.complete();
    }
}
