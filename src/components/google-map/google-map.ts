import { Component, ViewChild , ElementRef } from '@angular/core';
import { google } from "google-maps";

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @ViewChild("map", {read : ElementRef}) mapElement ;
  map : any;

  constructor() {
  }

  
  ngOnInit() {
    this.initMap();
   }

   initMap(){
     console.log(this.mapElement)
     let coords = new google.maps.LatLng(45,15);
     let mapOptions : google.maps.MapOptions ={
       center : coords ,
       zoom : 11,
       mapTypeId : google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)


   }
}
