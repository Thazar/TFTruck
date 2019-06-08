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
  id: number;
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
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }
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
        if (this.notifications.msg === "createTruck") {
          this.updateTruck(this.notifications.count);
        }
        if (this.notifications.msg === "deleteTruck") {
          this.deleteTruck(this.notifications.count);
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

        if (this.newTruck.truckRodzaj === "Full | 40t") {
          if ((this.newTruck.truckTyp === "Firanka") || (this.newTruck.truckTyp === "Plandeka")) {
            this.icon ={ url: "assets/images/bigTruckBlue.png", scaledSize: {height: 30, width: 104.1} }
          } else this.icon ={ url: "assets/images/bigTruckWhite.png", scaledSize: {height: 30, width: 104.1} }
        }
        if (this.newTruck.truckRodzaj === "Ciężarowy | 7.5-12t") {
          if ((this.newTruck.truckTyp === "Firanka") || (this.newTruck.truckTyp === "Plandeka")) {
            this.icon ={ url: "assets/images/soloTruckBlue.png", scaledSize: {height: 30, width: 104.1} }
          } else this.icon ={ url: "assets/images/soloTruckWhite.png", scaledSize: {height: 30, width: 104.1} }
        }
        if (this.newTruck.truckRodzaj === "Bus | 3.5t") {
           this.icon ={ url: "assets/images/bus.png", scaledSize: {height: 30, width: 104.1} }
        }
        
      
        this.markerArray.push({
          lat: this.newTruck.latitude,
          lng: this.newTruck.longitude,
          firstName: this.newTruck.truckFirstName,
          lastName: this.newTruck.truckLastName,
          id: this.newTruck.id,
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
          icon: this.icon,
        });
      })
    })
    
    
  }

  updateTruck(id: number) {
   this.truck = this.addTruckService.getTruckById(id)
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

   if (this.newTruck.truckRodzaj === "Full | 40t") {
    if ((this.newTruck.truckTyp === "Firanka") || (this.newTruck.truckTyp === "Plandeka")) {
      this.icon ={ url: "assets/images/bigTruckBlue.png", scaledSize: {height: 30, width: 104.1} }
    } else this.icon ={ url: "assets/images/bigTruckWhite.png", scaledSize: {height: 30, width: 104.1} }
  }
  if (this.newTruck.truckRodzaj === "Ciężarowy | 7.5-12t") {
    if ((this.newTruck.truckTyp === "Firanka") || (this.newTruck.truckTyp === "Plandeka")) {
      this.icon ={ url: "assets/images/soloTruckBlue.png", scaledSize: {height: 30, width: 104.1} }
    } else this.icon ={ url: "assets/images/soloTruckWhite.png", scaledSize: {height: 30, width: 104.1} }
  }
  if (this.newTruck.truckRodzaj === "Bus | 3.5t") {
     this.icon ={ url: "assets/images/bus.png", scaledSize: {height: 30, width: 104.1} }
  }
  

     this.markerArray.push({
       lat: this.newTruck.latitude,
       lng: this.newTruck.longitude,
       firstName: this.newTruck.truckFirstName,
       lastName: this.newTruck.truckLastName,
       id: this.newTruck.id,
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
       icon: this.icon,
     });
   });
    }
    initiateDeleteTruck(msg: Marker) {
      this.addTruckService.deleteTruckById(msg.id)
      .subscribe(data => console.log(data), error => console.log(error));
    }
    deleteTruck(id: number) {
      const index = this.markerArray.findIndex(marker => marker.id === id);
      this.markerArray.splice(index, 1)
    }
  

  }

