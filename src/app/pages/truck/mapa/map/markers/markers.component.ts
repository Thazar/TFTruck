import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../add-truck/truck';
import { AddTruckService } from '../../add-truck/add-truck.service';
import { MiscellaneousComponent } from '../../../../miscellaneous/miscellaneous.component';
import { count } from 'rxjs/operators';

interface Marker {
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  tel: string;
  transId: string;
  wolnyOd: string;
  wolnyDo: string;
  adres: string;
  typ: string;
  rodzaj: string;
  adr: boolean;
  winda: boolean;
  edscha: boolean;
  cerXl: boolean;
  uwagi: string;
}


@Component({
  selector: 'ngx-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss']
})
export class MarkersComponent implements OnInit {
  truck: Observable<Truck>;
  newTruck: Truck;
  trucks: Observable<Truck[]>;
  count: number;
  markerArray: Marker[] = [];
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }
public notifications = 0; 

  constructor(private addTruckService: AddTruckService){  
    let stompClient = this.addTruckService.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/topic/notification', notifications => {
        this.notifications = JSON.parse(notifications.body).count;
        if (this.notifications > 0) {
          this.updateTruck();
        }
        this.notifications = 0;
      })
    }); 
    
  }

  ngOnInit() {
    this.reloadData()
  }

  

  reloadData() {
    this.trucks = this.addTruckService.getAllTrucks();
    this.icon ={ url: "assets/images/bigTruck.png", scaledSize: {height: 35, width: 70} }
  }

  updateTruck() {
   this.truck = this.addTruckService.getTruckById(this.notifications)
   this.truck.subscribe(data => {
   this.newTruck = data as Truck;
     console.log("wiec kurwa id to: "+this.newTruck.id+"latitude to: " + this.newTruck.latitude + "Longitude to :" + this.newTruck.longitude)
     
     this.markerArray.push({
       lat: this.newTruck.latitude,
       lng: this.newTruck.longitude,
       firstName: this.newTruck.truckFirstName,
       lastName: this.newTruck.truckLastName,
       companyName: this.newTruck.truckCompanyName,
       email: this.newTruck.truckEmail,
       tel: this.newTruck.truckTel,
       transId: this.newTruck.truckTransId,
       wolnyOd: this.newTruck.truckWolnyOd,
       wolnyDo: this.newTruck.truckWolnyDo,
       adres: this.newTruck.truckAdres,
       typ: this.newTruck.truckTyp,
       rodzaj: this.newTruck.truckRodzaj,
       adr: this.newTruck.truckAdr,
       winda: this.newTruck.truckWinda,
       edscha: this.newTruck.truckEdscha,
       cerXl: this.newTruck.truckCerXl,
       uwagi: this.newTruck.truckUwagi,
     });
   });
    }

    

  }

