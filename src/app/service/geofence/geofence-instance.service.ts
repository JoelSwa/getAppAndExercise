/*tslint:disable*/
import { Injectable } from '@angular/core';
import {GeofenceInstance} from '../../model/geofence-instance';

@Injectable({
  providedIn: 'root'
})
export class GeofenceInstanceService {

  constructor() { }

  private singleGeofenceInfo: GeofenceInstance;

  public setSingleGeofenceInfo(geofence: GeofenceInstance) {
    this.singleGeofenceInfo = geofence;
  }

  public getSingleGeofenceInfo(): GeofenceInstance {
    return this.singleGeofenceInfo;
  }
}
