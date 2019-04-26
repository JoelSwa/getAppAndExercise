/* tslint:disable */
import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage {

    constructor(
        private http: HttpClient,
        private navCtrl: NavController
    ) {
    }

    data: any;
    usernameInput: string = '';
    passwordInput: string = '';

    public onEnterClick(event) {
        if (event.key === 'Enter') {
            let usernameField = <HTMLIonInputElement> document.getElementById('usernameField');
            let passwordField = <HTMLIonInputElement> document.getElementById('passwordField');
            let logInButton = <HTMLIonButtonElement> document.getElementById('logInButton');

            let passwordLength = this.passwordInput.length;
            let usernameLength = this.usernameInput.length;

            if (usernameLength > 0) {
                if (passwordLength > 0) {
                    logInButton.click();
                    return;
                }
                passwordField.setFocus();
                return;
            }

            if (passwordLength > 0) {
                if (usernameLength > 0) {
                    logInButton.click();
                    return;
                }
                usernameField.setFocus();
                return;
            }
        }
    }

    public logIn() {
        let req = new HttpRequest('POST', 'http://192.168.1.71:8080/users/login', {
            username: this.usernameInput,
            password: this.passwordInput
        });
        this.http.request(req).pipe(
            timeout(7000),
            map((response: any) => {
                return response;
            }),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    alert('Connection to server timed out');
                    return throwError('Timeout Exception');
                }
                return throwError(err);
            })
        ).subscribe((res: HttpResponse<any>) => {
                if (res.status === 202) {
                    alert('Welcome ' + res.body.username + '!');
                    this.navCtrl.navigateForward('list');
                }
            }, (error: HttpErrorResponse) => {
                if (error.status && error.error) {
                    alert(error.error);
                }
                console.error(error);
            });
    }
}
