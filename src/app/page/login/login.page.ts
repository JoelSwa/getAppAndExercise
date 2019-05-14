/* tslint:disable */
import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';
import {GeofenceService} from '../../service/geofence/geofence.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    constructor(
        private http: HttpClient,
        private navCtrl: NavController,
        private geofenceService: GeofenceService
    ) {
    }

    awaitingResponse: boolean = false;
    data: any;
    usernameInput: string = '';
    passwordInput: string = '';


    public onEnterClick(event) {
        if (event.key === 'Enter') {
            if (!this.awaitingResponse) {
                let usernameField = <HTMLIonInputElement> document.getElementById('usernameField');
                let passwordField = <HTMLIonInputElement> document.getElementById('passwordField');

                switch (0) {
                    case this.usernameInput.length:
                        usernameField.setFocus();
                        return;

                    case this.passwordInput.length:
                        passwordField.setFocus();
                        return;

                    default:
                        this.focusOutAndClick();
                        return;
                }
            }
        }
    }

    private focusOutAndClick() {
        let logInButton = <HTMLIonButtonElement> document.getElementById('logInButton');
        let activeElement = <HTMLIonInputElement> document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
        logInButton.click();
    }

    private logIn() {
        //ONLY FOR OFFLINE TESTING PURPOSES
        if (this.usernameInput === 'm' && this.passwordInput === 'm') {
            localStorage.setItem('username', 'admin');
            this.navCtrl.navigateRoot('home');
        } else {

            // ************************************************************************************************

            if (!this.awaitingResponse) {
                let req = new HttpRequest('POST', 'http://192.168.1.71:8080/users/login', {
                    username: this.usernameInput,
                    password: this.passwordInput
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
                    if (res.status === 202) {
                        localStorage.setItem('username', res.body.username);
                        this.geofenceService.init().then(() => {
                                console.log('init: accepted');
                                this.navCtrl.navigateRoot('home');
                            }, () => {
                                console.log('init: rejected');
                                alert("This app relies heavily on GPS. Walks will not function properly with this option disabled.")
                                this.navCtrl.navigateRoot('home');
                            }
                        );
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

    private register() {
        if (!this.awaitingResponse) {
            this.navCtrl.navigateBack('register');
        }
    }
}
