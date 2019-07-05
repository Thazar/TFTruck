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


public map_Class= 'high';

constructor() {
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
