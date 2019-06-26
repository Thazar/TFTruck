import { Component, Input, OnInit } from '@angular/core';
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


public map_Class= 'high';

constructor() {
this.getScreenSize();
}

@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
  this.screenHeight = window.innerHeight;
  this.screenWidth = window.innerWidth;
  console.log(this.screenHeight)
  if (this.screenHeight < 770 ) {
    this.map_Class = 'small'
  }
  else this.map_Class = 'high'
}
  
}
