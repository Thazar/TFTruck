import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../add-truck/truck';
import { AddTruckService } from '../../add-truck/add-truck.service';


@Component({
  selector: 'ngx-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss']
})
export class MarkersComponent implements OnInit {

  trucks: Observable<Truck[]>;
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }
  constructor(private truckService: AddTruckService) { }

  ngOnInit() {
    this.reloadData()
  }

  reloadData() {
    this.trucks = this.truckService.getAllTrucks();
    this.icon ={ url: "/assets/images/bigTruck.png", scaledSize: {height: 35, width: 70} }
  }



}
