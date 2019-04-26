/* tslint:disable */
import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {User} from './User';
import {isFocused} from '@ionic/core/dist/types/utils/input-shims/hacks/common';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage {

    constructor(private http: HttpClient) {
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
        this.http.request(req).subscribe((res: HttpResponse<any>) => {
            console.log('res.status === ' + res.status);
            //Switch-sats för fan
            if (res.status) {
                console.log('res.status.toString() : ' + res.status.toString());
                console.log('res.type : ' + res.type);
                console.log('res.ok : ' + res.ok);
                console.log('res.headers.get(\'content-type\') : ' + res.headers.get('content-type'));
                // let user: User = res.body;
                // alert('Welcome ' + user.username + "!");
            }
            // if (res.status === 400) {
            //     alert('Wrong password (or empty field?)');
            // }
            // if (res.status === 404) {
            //     alert('User not found');
            // }
            // if (res.status === 500) {
            //     alert('Internal server error');
            // }
            // if (res.status) {
            //     alert('Status ' + res.status);
            // }
        });
    }
}
