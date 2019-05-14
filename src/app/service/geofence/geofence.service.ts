/* tslint:disable */
import {Injectable} from '@angular/core';
import {Geofence} from '@ionic-native/geofence/ngx';
import {WalkInstance} from '../../model/walk-instance';
import {GeofenceInstance} from '../../model/geofence-instance';

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

    idTemp: number;
    private initialized: boolean = false;

    // public init() {
    //     this.geofence.initialize().then(
    //         // resolved promise does not return a value
    //         () => {
    //             this.initialized = true
    //             console.log('Geofence Plugin Ready');
    //         },
    //         (err) => console.log(err)
    //     );
    // }

    public init = (): Promise<any> => {
        if (!this.initialized) {
            return this.geofence.initialize().then(
                () => {
                    this.initialized = true;
                    console.debug('Geofence Plugin ready');
                    return;
                },
                (err) => {
                    console.error(err);
                    throw err;
                }
            );
        } else {
            return Promise.resolve();
        }
    };

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
        };
        this.geofence.addOrUpdate(fence).then(
            () => {
                console.log('Geofence added');
                this.idTemp++;
            },
            (err) => {
                console.log('Geofence failed to add');
                console.log(err);
            }
        );
    }

    public addGeofenceTest(name, lat, long, radius, transition: number) {
        if (transition < 0 || transition > 3) {
            transition = 3;
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
        };
        this.geofence.addOrUpdate(fence).then(
            () => {
                alert('Geofence added');
                console.log('Geofence added');
                this.idTemp++;
            },
            (err) => {
                console.log('Geofence failed to add');
                console.log(err);
            }
        );
    }

    private shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
    }

    /*
    Man kan ha "type" som parameter, som kollar vilken typ av walk det är man vill starta.


    confirmedNext : string = 'Next up: ' + savedFences[i + 1].name
    nonConfirmedNext : string = 'Good job!'


    if(turnBased){
        for(length - 1)
            confirmedNext
        lastIndex
            nonConfirmedNext
    }

    if(shuffled){
        savedFences.scramble()
        for(length - 1)
            confirmedNext
        lastIndex
            nonConfirmedNext
    }

    if(ownPick){
        for(length)
            nonConfirmedNext
    }
     */

    public startFixedTurnWalk(walk: WalkInstance) {
        if (this.initialized) {
            let savedFences: GeofenceInstance[] = walk.geofences;
            console.log('geofences.length : ' + savedFences.length);
            let fences = [];
            if(savedFences){
                if(savedFences.length > 1){
                    for (let i = 0; i < (savedFences.length - 1); i++) {
                        if (savedFences[i]) {
                            console.log('Geofence[' + i + '].name : ' + savedFences[i].name);
                            fences.push({
                                id: savedFences[i].name,
                                latitude: savedFences[i].latitude,
                                longitude: savedFences[i].longitude,
                                radius: savedFences[i].radius,
                                transitionType: savedFences[i].transition,
                                notification: {
                                    id: i,
                                    title: 'You\'ve arrived at ' + savedFences[i].name,
                                    text: 'Next up: ' + savedFences[i + 1].name,
                                    openAppOnClick: true
                                }
                            });
                        }
                    }
                }
                let lastIndex: number = (savedFences.length - 1);
                console.log('geofences[' + lastIndex + '].name : ' + savedFences[lastIndex].name);
                fences.push({
                    id: savedFences[lastIndex].name,
                    latitude: savedFences[lastIndex].latitude,
                    longitude: savedFences[lastIndex].longitude,
                    radius: savedFences[lastIndex].radius,
                    transitionType: savedFences[lastIndex].transition,
                    notification: {
                        id: lastIndex,
                        title: 'You\'ve arrived at ' + savedFences[lastIndex].name,
                        text: 'Good job!',
                        openAppOnClick: true
                    }
                });
                console.log('Geofences', fences);
                this.geofence.addOrUpdate(fences).then(
                    () => {
                        console.log('Geofences added');

                    },
                    (err) => {
                        console.log('Geofences failed to add');
                        console.log(err);
                    }
                );
            }
        } else {
            this.init().then(() => {
                this.startFixedTurnWalk(walk);
            });
        }
    }

    public startShuffledWalk(walk: WalkInstance){
        if (this.initialized) {
            let savedFences: GeofenceInstance[] = walk.geofences;
            console.log('geofences.length : ' + savedFences.length);
            let fences = [];
            this.shuffle(savedFences)
            if(savedFences){
                if(savedFences.length > 1){
                    for (let i = 0; i < (savedFences.length - 1); i++) {
                        if (savedFences[i]) {
                            console.log('Geofence[' + i + '].name : ' + savedFences[i].name);
                            fences.push({
                                id: savedFences[i].name,
                                latitude: savedFences[i].latitude,
                                longitude: savedFences[i].longitude,
                                radius: savedFences[i].radius,
                                transitionType: savedFences[i].transition,
                                notification: {
                                    id: i,
                                    title: 'You\'ve arrived at ' + savedFences[i].name,
                                    text: 'Next up: ' + savedFences[i + 1].name,
                                    openAppOnClick: true
                                }
                            });
                        }
                    }
                }
                let lastIndex: number = (savedFences.length - 1);
                console.log('geofences[' + lastIndex + '].name : ' + savedFences[lastIndex].name);
                fences.push({
                    id: savedFences[lastIndex].name,
                    latitude: savedFences[lastIndex].latitude,
                    longitude: savedFences[lastIndex].longitude,
                    radius: savedFences[lastIndex].radius,
                    transitionType: savedFences[lastIndex].transition,
                    notification: {
                        id: lastIndex,
                        title: 'You\'ve arrived at ' + savedFences[lastIndex].name,
                        text: 'Good job!',
                        openAppOnClick: true
                    }
                });
                console.log('Geofences', fences);
                this.geofence.addOrUpdate(fences).then(
                    () => {
                        console.log('Geofences added');

                    },
                    (err) => {
                        console.log('Geofences failed to add');
                        console.log(err);
                    }
                );
            }
        } else {
            this.init().then(() => {
                this.startFixedTurnWalk(walk);
            });
        }
    }
}
