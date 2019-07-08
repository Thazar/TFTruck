import { Component, OnInit } from '@angular/core';
import { Observable, range } from 'rxjs';
import { Truck } from '../../add-truck/truck';
import { AddTruckService } from '../../add-truck/add-truck.service';

import { Notifications } from '../../add-truck/notifications';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import * as eva from 'eva-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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
  kraj: string;
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }
  markerOpened: boolean;
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
  circleLat: number;
  circleLng: number;
  circleColor:string;
  circleRange:number;
  markerArray: Marker[] = [];
  savedMarkers: Marker[] = [];
  range: number = 5;
  markerOpened: boolean = false;
  showMarkers: boolean = true;
  
 
  
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }
  message: string;
  notifications: Notifications;
  circleShowed: boolean = false;

  constructor(private addTruckService: AddTruckService, private toastr: ToastrService  ){  
    const eva = require('eva-icons');
    this.addTruckService.filter.freeOn.setValue('')
    var index;
    const dateOd = new FormControl(new Date()) 
    const dateDo = new FormControl(new Date());
    const moment = require('moment');
    moment.locale('pl');
    this.addTruckService.currentMessage.subscribe(message => {
    
      this.range = addTruckService.filter.range;
      console.log(this.addTruckService.filter.range);
      this.circleRange = addTruckService.filter.range * 1000;
      this.circleColor = "red"
      this.markerArray = [...this.savedMarkers];
      this.addTruckService.pojazdy = this.markerArray.length;
      this.addTruckService.changeMessageMapa('scan');
        this.circleLat = addTruckService.filter.lat;
        this.circleLng = addTruckService.filter.lng;

        for (index = this.markerArray.length -1; index >= 0; index -= 1) {
          if (this.addTruckService.filter.freeOn.value !== '') {
            dateOd.setValue(this.markerArray[index].wolnyOd);
            dateDo.setValue(this.markerArray[index].wolnyDo);
            const dateOdValue = moment(dateOd.value, 'DD.MM.YYYY').valueOf();
            const dateDoValue = moment(dateDo.value, 'DD.MM.YYYY').valueOf();
            const filterDateValue = moment(this.addTruckService.filter.freeOn.value, 'DD.MM.YYYY').valueOf();
            if (filterDateValue < dateOdValue || filterDateValue > dateDoValue ) {
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
              continue;
            }
          }
          if (this.addTruckService.filter.typValue !== '') {
            if (this.markerArray[index].typ !== this.addTruckService.filter.typValue) {
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
              continue;
            }
          }
          if (this.addTruckService.filter.rodzajValue !== '') {
            if (this.markerArray[index].rodzaj !== this.addTruckService.filter.rodzajValue) {
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
              continue;
            }
          }
          if (this.addTruckService.filter.specSelected !== undefined) {
            if (this.addTruckService.filter.specSelected.length > 0) {
            var specIndex
            var specCount = 0;
            for (specIndex = this.addTruckService.filter.specSelected.length -1; specIndex >= 0; specIndex -= 1) {
              if (this.addTruckService.filter.specSelected[specIndex] === this.markerArray[index].adr 
                || this.addTruckService.filter.specSelected[specIndex] === this.markerArray[index].cerXl 
                || this.addTruckService.filter.specSelected[specIndex] === this.markerArray[index].edscha 
                || this.addTruckService.filter.specSelected[specIndex] === this.markerArray[index].winda) {
                  specCount += 1;
              }
            }
            if (specCount !== this.addTruckService.filter.specSelected.length) {
              console.log("specwybrane" + this.addTruckService.filter.specSelected.length + "nie jest rowny specCount:" + specCount);
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
              specCount = 0;
              continue;
            }
            specCount = 0;
          }
        }    
      }

       if (this.addTruckService.adresSelected === true) {
         this.addTruckService.adresRealSelected = true;
        this.circleShowed = true;
       } else {
         this.circleShowed = false;
         this.addTruckService.adresRealSelected = false
       }

       if (this.addTruckService.adresSelected === true) {
         for (index = this.markerArray.length -1; index >= 0; index -= 1) {
        
          if (this.addTruckService.filter.freeOn.value !== '') {
          dateOd.setValue(this.markerArray[index].wolnyOd);
          dateDo.setValue(this.markerArray[index].wolnyDo);
          const dateOdValue = moment(dateOd.value, 'DD.MM.YYYY').valueOf();
          const dateDoValue = moment(dateDo.value, 'DD.MM.YYYY').valueOf();
          const filterDateValue = moment(this.addTruckService.filter.freeOn.value, 'DD.MM.YYYY').valueOf();
          if (filterDateValue < dateOdValue || filterDateValue > dateDoValue ) {
            this.markerArray.splice(index, 1);
            this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
            continue;
          }
        }

       const center = new google.maps.LatLng(addTruckService.filter.lat, addTruckService.filter.lng)
       const markerLoc = new google.maps.LatLng(this.markerArray[index].lat, this.markerArray[index].lng)
       const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
       if (distanceInKm > this.range) {
         this.markerArray.splice(index, 1);
         this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
       } else this.circleColor = "#0081ba"
      }
      return
    }
   
      for (index = this.markerArray.length -1; index >= 0; index -= 1) {
        if (this.addTruckService.filter.kraj === '') {
         break; 
        }
          if  (this.markerArray[index].kraj !== this.addTruckService.filter.kraj) {     
          this.markerArray.splice(index, 1)
          this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
          continue;
        }
        
      }
      this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
    }
     );
    
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

   this.addTruckService.trucksCount = this.markerArray.length;
 
    
  }

  ngOnInit() {
    this.reloadData();
    
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
          edschaString = "Edscha"   
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
        
        this.showMarkers = false;
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
          kraj: this.newTruck.truckKraj,
          markerOpened: false
        });
        this.showMarkers = true;
        this.savedMarkers = [...this.markerArray]
        this.addTruckService.pojazdy = this.markerArray.length;
        this.addTruckService.changeMessageMapa('scan');
      })
    })
    
    
  }
  showToast() {
    const toastrLatitude = this.newTruck.latitude;
    const toastrLongitude = this.newTruck.longitude;
    const markerId = this.newTruck.id;
    this.toastr.success(
      ` ${this.newTruck.truckCompanyName} `,
      `${this.newTruck.truckAdres} \ 
       ${this.newTruck.truckRodzaj} ${this.newTruck.truckTyp} \ `,
      ).onTap.pipe().subscribe(() => {
        this.addTruckService.toastrClicked = true;
        this.addTruckService.position.latitude = toastrLatitude;
        this.addTruckService.position.longitute = toastrLongitude;
        this.addTruckService.position.zoom = 8;
        this.addTruckService.changeMessageMapaPosition('set');
        this.addTruckService.toastrClicked = false;
        for (var index = this.markerArray.length -1; index > 0; index -= 1) {
          if (this.markerArray[index].id === markerId) {
            this.markerArray[index].markerOpened = true;
          }
        }
      });
  }

  showToastDelete() {
    this.toastr.error(
      ` ${this.newTruck.truckCompanyName} `,
      `${this.newTruck.truckAdres} \ 
       ${this.newTruck.truckRodzaj} ${this.newTruck.truckTyp} \ `,
      );
  }
  updateTruck(id: number) {
   this.truck = this.addTruckService.getTruckById(id)
   this.truck.subscribe(data => {
   this.newTruck = data as Truck;
   var adrString = "";
   var edschaString = "";
   var windaString = "";
   var cerXlString = "";
   var index;
   const dateOd = new FormControl(new Date()) 
   const dateDo = new FormControl(new Date());
   const moment = require('moment');
   moment.locale('pl');

   if (this.newTruck.truckAdr == true) {
     adrString = "Adr"   
   } else adrString=""
   if (this.newTruck.truckEdscha == true) {
     edschaString = "Edscha"   
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

  this.savedMarkers.push({
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
    kraj: this.newTruck.truckKraj,
    markerOpened: false
  });

  if (this.addTruckService.adresRealSelected === true) {

    if (this.addTruckService.filter.freeOn.value !== '') {
      dateOd.setValue(this.newTruck.truckWolnyOd);
      dateDo.setValue(this.newTruck.truckWolnyDo);
      const dateOdValue = moment(dateOd.value, 'DD.MM.YYYY').valueOf();
      const dateDoValue = moment(dateDo.value, 'DD.MM.YYYY').valueOf();
      const filterDateValue = moment(this.addTruckService.filter.freeOn.value, 'DD.MM.YYYY').valueOf();
      if (filterDateValue < dateOdValue || filterDateValue > dateDoValue ) {
        return;      
      }
    }

  const center = new google.maps.LatLng(this.addTruckService.filter.lat, this.addTruckService.filter.lng)
  const markerLoc = new google.maps.LatLng(this.newTruck.latitude, this.newTruck.longitude)
  const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
  
   if (distanceInKm > this.range) {
    return;
   }  

}

  if(this.addTruckService.filter.kraj !== '') {
    if (this.newTruck.truckKraj !== this.addTruckService.filter.kraj) {
      return;
    }
  }

  if (this.addTruckService.filter.freeOn.value !== '') {
    console.log("tu mamy buga")
    dateOd.setValue(this.newTruck.truckWolnyOd);
    dateDo.setValue(this.newTruck.truckWolnyDo);
    const dateOdValue = moment(dateOd.value, 'DD.MM.YYYY').valueOf();
    const dateDoValue = moment(dateDo.value, 'DD.MM.YYYY').valueOf();
    const filterDateValue = moment(this.addTruckService.filter.freeOn.value, 'DD.MM.YYYY').valueOf();
    if (filterDateValue < dateOdValue || filterDateValue > dateDoValue ) {
      return;      
    }
  }

  if (this.addTruckService.filter.typValue !== '') {
    if (this.newTruck.truckTyp !== this.addTruckService.filter.typValue) {
      return
      
    }
  }
  if (this.addTruckService.filter.rodzajValue !== '') {
    if (this.newTruck.truckRodzaj !== this.addTruckService.filter.rodzajValue) {
      return;
    }
  }
  if (this.addTruckService.filter.specSelected !== undefined) {
    if (this.addTruckService.filter.specSelected.length > 0) {
      console.log("otwieramy funcje")
    var specIndex
    var specCount = 0;
    for (specIndex = this.addTruckService.filter.specSelected.length -1; specIndex >= 0; specIndex -= 1) {
      if (this.addTruckService.filter.specSelected[specIndex] ===  adrString
        || this.addTruckService.filter.specSelected[specIndex] === cerXlString
        || this.addTruckService.filter.specSelected[specIndex] === edschaString
        || this.addTruckService.filter.specSelected[specIndex] === windaString) {
          specCount += 1;
      }
    }
    if (specCount !== this.addTruckService.filter.specSelected.length) {
      console.log("specwybrane" + this.addTruckService.filter.specSelected.length + "nie jest rowny specCount:" + specCount);
      specCount = 0;
      return;
    }
    specCount = 0;
  }
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
       kraj: this.newTruck.truckKraj,
       markerOpened: false
     });
     if (this.circleShowed === true) {
       if (this.circleColor === 'red') {
         this.circleColor = '#0081ba';
       }
     }
     this.showToast();
     this.addTruckService.pojazdy = this.markerArray.length;
     this.addTruckService.changeMessageMapa('scan');
   });
    }
    initiateDeleteTruck(msg: Marker) {
      this.addTruckService.deleteTruckById(msg.id)
      .subscribe(data => console.log(data), error => console.log(error));
    }
    deleteTruck(id: number) {
      
      for (var deleteIndex = this.markerArray.length -1 ; deleteIndex > -1; deleteIndex -= 1) {
        if (this.markerArray[deleteIndex].id === id) {
          this.markerArray.splice(deleteIndex, 1);
          this.showToastDelete();
        }
      }
      const index2 = this.savedMarkers.findIndex(marker => marker.id === id);
      this.savedMarkers.splice(index2, 1)

      if (this.circleShowed === true) {
        if (this.markerArray.length === 0) {
          this.circleColor = 'red'
        }
      }

      this.addTruckService.pojazdy = this.markerArray.length;
      this.addTruckService.changeMessageMapa('scan');
    
   
    }
  
    filter(truck: Truck) {
      if (this.addTruckService.filter.kraj === truck.truckKraj)
      return true;
      else return false;
    }

    openMarker(id) {
     for (var windowIndex = this.markerArray.length -1; windowIndex > -1; windowIndex -= 1) {
       if (this.markerArray[windowIndex].id === id) {
         this.markerArray[windowIndex].markerOpened = true;
       }
     }
    }

  }

