/* tslint:disable */
import {Injectable} from '@angular/core';
import {Geofence} from '@ionic-native/geofence/ngx';

/**
 * Variable for accessing custom methods from Geofence-plugin
 */
declare var window;

interface NotificationData {
    walkId: number
    locationIndex: number
}

@Injectable({
    providedIn: 'root'
})
export class GeofenceService {

    constructor(private geofence: Geofence) {
    }

    idTemp: number

    public init(){
        this.geofence.initialize().then(
            // resolved promise does not return a value
            () => {
                console.log('Geofence Plugin Ready')
                this.addGeofence()
            },
            (err) => console.log(err)
        )
    }

    private addGeofence() {
        let fence = {
            id: 'TestWalk', //any unique ID
            latitude: 59.316338, //center of geofence radius
            longitude: 18.233760,
            radius: 50, //radius to edge of geofence in meters
            transitionType: 1, //see 'Transition Types' below
            notification: { //notification settings
                id: this.idTemp, //any unique ID
                title: 'You crossed a fence', //notification title
                text: 'You have just arrived at gosekatt', //notification body
                openAppOnClick: true //open app when notification is tapped
            }
        }
        this.geofence.addOrUpdate(fence).then(
            () => {
                console.log('Geofence added')
                this.idTemp++
            },
            (err) => {
                console.log('Geofence failed to add')
                console.log(err)
            }
        )
    }

    public addGeofenceTest(name, lat, long, radius, transition: number) {
        if(transition < 0 || transition > 3){
            transition = 3
        }
        let fence = {
            id: name, //any unique ID
            latitude: lat, //center of geofence radius
            longitude: long,
            radius: radius, //radius to edge of geofence in meters
            transitionType: transition, //see 'Transition Types' below
            notification: { //notification settings
                id: name, //any unique ID
                title: 'Geofence crossed', //notification title
                text: 'You\'ve just arrived at ' + name, //notification body
                openAppOnClick: true //open app when notification is tapped
            }
        }
        this.geofence.addOrUpdate(fence).then(
            () => {
                alert("Geofence added")
                console.log('Geofence added')
                this.idTemp++
            },
            (err) => {
                console.log('Geofence failed to add')
                console.log(err)
            }
        )
    }
}
