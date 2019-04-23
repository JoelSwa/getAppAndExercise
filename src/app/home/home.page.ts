/* tslint:disable */
import {Component, Inject, Injectable, InjectionToken, NgModule} from '@angular/core';
// import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {
    HttpClientModule,
    HttpHeaders,
    HttpClient,
    HTTP_INTERCEPTORS,
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import {Observable} from 'rxjs';
// import 'rxjs/add/operator/timeout';
import {timeout} from 'rxjs/operators';
// import {DEFAULT_TIMEOUT} from '../app.module';

// const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
    constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercept");
        const timeoutValue = Number(req.headers.get('timeout')) || this.defaultTimeout;
        // req.headers.delete('timeout');
        // req.headers.set('timeout', timeout.toString())
        // return next.handle(req);
        return next.handle(req).pipe(timeout(timeoutValue));
    }
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

@Injectable()
export class HomePage {

    constructor(private http: HttpClient) {
    }

    responseData: any;
    errorData: any;
    data: any;

    public logIn() {
        console.log('login start');
        this.responseData = null;
        this.errorData = null;
        this.http.get('http://192.168.1.71:8080/users', {headers: new HttpHeaders({ timeout: `${7000}`}), responseType: 'text'})
            .subscribe(
                (response) => {
                    if (response) {
                        console.log('response: ' + response.toString());
                        this.responseData = response.toString();
                        console.log('responseData: ' + this.responseData);
                        alert(response);
                    } else {
                        alert('No response data');
                    }
                },
                (error) => {
                    if(error.name === 'TimeoutError'){
                        alert('Connection timed-out')
                    } else {
                        alert(error.message);
                    }
                    console.error(error);
                });
        console.log('login end');
    }
}
