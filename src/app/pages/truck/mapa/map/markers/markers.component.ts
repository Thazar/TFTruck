import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../add-truck/truck';
import { AddTruckService } from '../../add-truck/add-truck.service';
import { MiscellaneousComponent } from '../../../../miscellaneous/miscellaneous.component';
import { count } from 'rxjs/operators';
import { strictEqual } from 'assert';
import { element } from '@angular/core/src/render3';
import { Notifications } from '../../add-truck/notifications';

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
  adr: string;
  winda: string;
  edscha: string;
  cerXl: string;
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
  notifications: Notifications;

  constructor(private addTruckService: AddTruckService){  
    let stompClient = this.addTruckService.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/topic/notification', notifications => {
        this.notifications = JSON.parse(notifications.body);
        if (this.notifications.msg === "create") {
          this.updateTruck();
        }
        this.notifications.count =0;
        this.notifications.msg = '';
      })
    }); 
    
  }

  ngOnInit() {
    this.reloadData()
  }

  

  reloadData() {
    this.addTruckService.getAllTrucks().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        this.newTruck = snapshot as Truck
        var adrString = "";
        var edschaString = "";
        var windaString = "";
        var cerXlString = "";
        if (this.newTruck.truckAdr == true) {
          adrString = "Adr"   
        } else adrString=""
        if (this.newTruck.truckEdscha == true) {
          edschaString = "Zaladunek Górą"   
        } else edschaString=""
        if (this.newTruck.truckWinda == true) {
          windaString = "Winda"   
        } else windaString=""
        if (this.newTruck.truckCerXl == true) {
          cerXlString = "Cer. XL"   
        } else cerXlString=""
      
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
          adr: adrString,
          winda: windaString,
          edscha: edschaString,
          cerXl: cerXlString,
          uwagi: this.newTruck.truckUwagi,
        });
      })
    })
    
    this.icon ={ url: "assets/images/bigTruck.png", scaledSize: {height: 35, width: 70} }
  }

  updateTruck() {
   this.truck = this.addTruckService.getTruckById(this.notifications.count)
   this.truck.subscribe(data => {
   this.newTruck = data as Truck;
   var adrString = "";
   var edschaString = "";
   var windaString = "";
   var cerXlString = "";
   if (this.newTruck.truckAdr == true) {
     adrString = "Adr"   
   } else adrString=""
   if (this.newTruck.truckEdscha == true) {
     edschaString = "Zaladunek Górą"   
   } else edschaString=""
   if (this.newTruck.truckWinda == true) {
     windaString = "Winda"   
   } else windaString=""
   if (this.newTruck.truckCerXl == true) {
     cerXlString = "Cer. XL"   
   } else cerXlString=""
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
       adr: adrString,
       winda: windaString,
       edscha: edschaString,
       cerXl: cerXlString,
       uwagi: this.newTruck.truckUwagi,
     });
   });
    }
    deleteTruck(msg: Marker) {
      
      const index: number = this.markerArray.indexOf(msg);
      this.markerArray.splice(index, 1)
    }
    

  }

