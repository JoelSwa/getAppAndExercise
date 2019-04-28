/* tslint:disable */
/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

    @ViewChild("map") mapElement
    map: any
    constructor() {
    }

    ngOnInit() {
        this.initMap()
    }

    initMap(){
        let coords = new google.maps.LatLng(59.316049, 18.235924)
        let mapOptions: google.maps.MapOptions = {
            center: coords,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    }

}
