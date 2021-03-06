/* tslint:disable */
import {Injectable} from '@angular/core';
import {Geofence} from '@ionic-native/geofence/ngx';
import {WalkInstance} from '../../model/walk-instance';
import {GeofenceInstance} from '../../model/geofence-instance';

@Injectable({
    providedIn: 'root'
})
export class GeofenceService {

    constructor(private geofence: Geofence) {
    }

    private initialized: boolean = false;

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

    private shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
    }

    public startFixedTurnWalk(walk: WalkInstance) {
        if (this.initialized) {
            let savedFences: GeofenceInstance[] = walk.geofences;
            console.log('geofences.length : ' + savedFences.length);
            let fences = [];
            if (savedFences.length > 0) {
                if (savedFences.length > 1) {
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
                                    text: 'Next one: ' + savedFences[i + 1].name,
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
                        alert('Walk started!\n\nFirst stop is ' + savedFences[0].name);
                    },
                    (err) => {
                        console.log('Geofences failed to add');
                        console.log(err);
                    }
                );
            } else {
                alert('No locations found for walk');
            }
        } else {
            this.init().then(() => {
                this.startFixedTurnWalk(walk);
            });
        }
    }

    public startShuffledWalk(walk: WalkInstance) {
        if (this.initialized) {
            let savedFences: GeofenceInstance[] = walk.geofences;
            console.log('geofences.length : ' + savedFences.length);
            let fences = [];
            this.shuffle(savedFences);
            if (savedFences.length > 0) {
                if (savedFences.length > 1) {
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
                                    text: 'Next one: ' + savedFences[i + 1].name,
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
                        alert('Shuffled walk started!\n\nGo to: ' + savedFences[0].name);
                        console.log('Geofences added');

                    },
                    (err) => {
                        console.log('Geofences failed to add');
                        console.log(err);
                    }
                );
            } else {
                alert('No locations found for walk');
            }
        } else {
            this.init().then(() => {
                this.startShuffledWalk(walk);
            });
        }
    }
}
