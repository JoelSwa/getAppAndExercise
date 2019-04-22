/* tslint:disable */
import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

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

    public logIn() {
        this.http.get('http://192.168.1.71:8080/users', {responseType: 'text'}).subscribe(
            response => this.data = response.toString());
        console.log('login');
        if (this.data) {
            alert(this.data);
        } else {
            alert('Data == null');
        }
    }
}
