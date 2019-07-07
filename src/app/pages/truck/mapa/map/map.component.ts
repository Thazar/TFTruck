import { Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AddTruckService } from '../add-truck/add-truck.service';
import { HostListener } from '@angular/core';




@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
screenHeight: any;
screenWidth: any;
mapSize: any;
latitude: number = 49.8915943;
longitude: number = 8.9206519;
zoom: number = 6;


public map_Class= 'high';

constructor(addTruckService: AddTruckService,) {
  addTruckService.currentMessageMapaPosition.subscribe(message => {
    if (addTruckService.filter.kraj !=='') {
      if (addTruckService.filter.kraj == 'Polska') {
        this.latitude = 52.1884838;
        this.longitude = 18.8885656;
        this.zoom = 6;
      }
      if (addTruckService.filter.kraj == 'Niemcy') {
        this.latitude = 50.7571597;
        this.longitude = 10.5762499;
        this.zoom = 6;
      }
      if (addTruckService.filter.kraj == 'Francja') {
        this.latitude = 46.0654438;
        this.longitude = 1.8531053;
        this.zoom = 6;
      }
    }
  } );

this.getScreenSize();

}

@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
  this.screenHeight = window.innerHeight;
  this.screenWidth = window.innerWidth;
  this.mapSize = this.screenHeight - 275;
 
  
  if (this.screenHeight < 641 ) {
    this.mapSize = this.screenHeight - 205;
  }
}
  
}
