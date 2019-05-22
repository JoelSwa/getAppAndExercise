/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {catchError, map, timeout} from 'rxjs/operators';
import {throwError, TimeoutError} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

    constructor(
        private navCtrl: NavController,
        private http: HttpClient
    ) {
    }

    usernameInput: string = '';
    passwordFirstInput: string = '';
    passwordSecondInput: string = '';
    awaitingResponse: boolean = false;

    public onEnterClick(event) {
        if (event.key === 'Enter') {
            if (!this.awaitingResponse) {
                let usernameField = <HTMLIonInputElement> document.getElementById('usernameRegField');
                let passwordFirstField = <HTMLIonInputElement> document.getElementById('passwordRegField');
                let passwordSecondField = <HTMLIonInputElement> document.getElementById('passwordRegFieldRepeat');

                switch (0) {
                    case this.usernameInput.length: {
                        usernameField.setFocus();
                        return;
                    }

                    case this.passwordFirstInput.length: {
                        passwordFirstField.setFocus();
                        return;
                    }

                    case this.passwordSecondInput.length: {
                        passwordSecondField.setFocus();
                        return;
                    }

                    default: {
                        if (this.passwordFirstInput === this.passwordSecondInput) {
                            this.focusOutAndRegister();
                            return;
                        }
                        alert('Passwords did not match');
                        passwordFirstField.value = '';
                        passwordSecondField.value = '';
                        passwordFirstField.setFocus();
                        return;
                    }
                }
            }
        }
    }

    private focusOutAndRegister() {
        let activeElement = <HTMLIonInputElement> document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
        this.register();
    }

    private register() {
        if (!this.awaitingResponse) {
            if (this.usernameInput.length > 0 && this.passwordFirstInput.length > 0 && this.passwordSecondInput.length > 0) {
                let req = new HttpRequest('POST', 'http://192.168.1.71:8080/users', {
                    username: this.usernameInput,
                    password: this.passwordFirstInput
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
                        alert('New account registered!');
                        this.navCtrl.navigateRoot('login');
                    }
                }, (error: HttpErrorResponse) => {
                    if (error.status && error.error) {
                        alert(error.error);
                    }
                    console.error(error);
                });
            } else {
                alert('None of the fields can be empty');
            }
        }
    }

    private goToLogin() {
        if (!this.awaitingResponse) {
            this.navCtrl.navigateRoot('login');
        }
    }
}
