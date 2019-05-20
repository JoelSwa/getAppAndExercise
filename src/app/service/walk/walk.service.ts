/*tslint:disable*/
import {Injectable} from '@angular/core';
import {WalkInstance} from '../../model/walk-instance';

@Injectable({
    providedIn: 'root'
})
export class WalkService {

    constructor() {
    }

    private activeWalk: WalkInstance;

    public setActiveWalk(walk: WalkInstance) {
        this.activeWalk = walk;
    }

    public getActiveWalk(): WalkInstance {
        return this.activeWalk;
    }
}
