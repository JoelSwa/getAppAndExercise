/* tslint:disable */
import {Injectable} from '@angular/core';
import {Geofence} from '@ionic-native/geofence/ngx';


declare var window;

interface NotificationData {
    walkId: number
    locationIndex: number
    lang: string
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
            id: 'usernameForNow', //any unique ID, perhaps an Id for the placed geofence that combines userId (bad) or user salt (hmm..) + fence-number
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
            () => console.log('Geofence added'),
            (err) => {
                console.log('Geofence failed to add')
                console.log(err)
                this.idTemp++   //Ta bort när testet är klart
            }
        );
    }

    public addGeofenceTest(lat, long, radius) {
        let fence = {
            id: 1, //any unique ID, perhaps an Id for the placed geofence that combines userId (bad) or user salt (hmm..) + fence-number
            latitude: lat, //center of geofence radius
            longitude: long,
            radius: radius, //radius to edge of geofence in meters
            transitionType: 3, //see 'Transition Types' below
            notification: { //notification settings
                id: this.idTemp, //any unique ID
                title: 'You crossed a fence', //notification title
                text: 'You\'ve just arrived at gosekatt', //notification body
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
        );
    }
}
