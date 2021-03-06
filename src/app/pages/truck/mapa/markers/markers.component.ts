import { Component, OnInit, OnDestroy, ViewChild, IterableDiffers, DoCheck, AfterContentInit} from '@angular/core';
import { Observable, range } from 'rxjs';
import { Truck } from '../add-truck/truck';
import { AddTruckService } from '../add-truck/add-truck.service';
import { HostListener } from '@angular/core';
import { Notifications } from '../add-truck/notifications';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import * as eva from 'eva-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';




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
  color: string;
  created: string;
}

@Component({
  selector: 'ngx-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MarkersComponent implements AfterContentInit ,OnDestroy, DoCheck, OnInit {
  truck: Observable<Truck>;
  newTruck: Truck;
  trucks: Observable<Truck[]>;
  count: number;
  circleLat: number;
  circleLng: number;
  circleColor:string;
  circleRange:number;
  markerArray: Marker[] = [];
  renderedData: Marker[];
  savedMarkers: Marker[] = [];
  range: number = 5;
  markerOpened: boolean = false;
  showMarkers: boolean = true;
  mapaToggle: boolean = true;
  listToggle: boolean;
  screenHeight: any;
  screenWidth: any;
  mapSize: any;
  latitude: number = 49.8915943;
  longitude: number = 8.9206519;
  zoom: number = 6;
  public map_Class= 'high';
  colorNumber: number = 0;
  created = new FormControl(new Date());
  
 
  differ: any;
  
  icon: {
    url: string, scaledSize: {height: number, width: number}
  }

  states= 
    { kraj: {
      // https://commons.wikimedia.org/wiki/File:Flag_of_Poland.svg
      Polska: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Germany.svg
      Niemcy: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',   
      // https://commons.wikimedia.org/wiki/File:Flag_of_France.svg
      Francja: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
      // https://commons.wikimedia.org/wiki/Fisle:Flag_of_Italy.svg
      Włochy: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
    }
    }

    
   
    
  
  message: string;
  notifications: Notifications;
  circleShowed: boolean = false;
  stompClient: any;
  matRow: boolean = true;
  columnsValue = ['created',  'rodzaj', 'typ',  'wolnyOd', 'wolnyDo','kraj', 'adres'];
  displayedColumns = {created: 'Dodano',  rodzaj: 'Pojazd', typ: 'Nadwozie', wolnyOd: 'Wolny od', wolnyDo: 'Wolny do', kraj:'', adres: 'Adres',}
  icons = { created: 'fas fa-history fa-2x', rodzaj: 'fas fa-truck fa-2x', wolnyOd: 'fas fa-calendar fa-2x', wolnyDo: 'far fa-calendar fa-2x', typ: 'fas fa-truck-loading fa-2x', kraj:'fas fa-flag fa-2x', adres: 'fas fa-map-marker-alt fa-2x'}
  dataSource = new MatTableDataSource<Marker>(this.markerArray);
  paginator: MatPaginator;
  sort: MatSort;
  expandedElement: Marker | null;
 



  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  

  constructor(private addTruckService: AddTruckService, private toastr: ToastrService, differs: IterableDiffers){  
    this.differ = differs.find([]).create(null);
    addTruckService.currentMessageMapaPosition.subscribe(message => {
      if (message === 'setMyTrucks') {
        for(var myTrucksIndex = this.markerArray.length -1; myTrucksIndex > -1; myTrucksIndex -= 1) {
          const tempTruck = this.markerArray[myTrucksIndex];
          if(!(tempTruck.companyName === addTruckService.user.userCompanyName && tempTruck.firstName === addTruckService.user.userFirstName && tempTruck.lastName === this.addTruckService.user.userLastName
             && tempTruck.email === this.addTruckService.user.username)) {
               this.markerArray.splice(myTrucksIndex, 1);
             } 
        }
        this.addTruckService.pojazdy = this.markerArray.length;
      }
      if (addTruckService.toastrClicked === true) {
        this.latitude = addTruckService.position.latitude;
        this.longitude = addTruckService.position.longitute;
        this.zoom = 8;
      }
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
        if (addTruckService.adresRealSelected ) {
          this.latitude = addTruckService.position.latitude;
          this.longitude = addTruckService.position.longitute;
          this.zoom = 8;
        }
      }
    } );
  
  this.getScreenSize();
  
    const eva = require('eva-icons');
    this.addTruckService.filter.freeOn.setValue('')
    var index;
    const dateOd = new FormControl(new Date()) 
    const dateDo = new FormControl(new Date());
    const moment = require('moment');
    moment.locale('pl');
    this.addTruckService.currentMessage.subscribe(message => {
     if (this.dataSource.sort) {
       this.dataSource.sort.direction = '';
       this.dataSource.sort._stateChanges.next();
     }
      for (var windowIndex = this.markerArray.length -1; windowIndex > -1; windowIndex -= 1) {
        this.markerArray[windowIndex].markerOpened = false;     
    }
      if (message === 'closeMarkers') {
        this.mapaToggle = this.addTruckService.mapaToggle;
        this.listToggle = this.addTruckService.listToggle;
      }
      if (message === 'search') {
        this.matRow = false;
        this.dataSource = new MatTableDataSource<Marker>(this.markerArray);
        this.matRow = true;
        this.latitude = 49.8915943;
  this.longitude = 8.9206519;
  this.zoom = 6;
      this.range = addTruckService.filter.range;
      console.log(this.addTruckService.filter.range);
      this.circleRange = addTruckService.filter.range * 1000;
      this.circleColor = "red"
      this.markerArray = [...this.savedMarkers];
      this.addTruckService.pojazdy = this.markerArray.length;
      for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
        if(this.markerArray[colorIndex + 1].color === "white") {
          this.markerArray[colorIndex].color = "grey";
        } else {
          this.markerArray[colorIndex].color = "white";
        }
      }
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
              for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
                if(this.markerArray[colorIndex + 1].color === "white") {
                  this.markerArray[colorIndex].color = "grey";
                } else {
                  this.markerArray[colorIndex].color = "white";
                }
              }
        this.addTruckService.changeMessageMapa('scan');
              continue;
            }
          }
          if (this.addTruckService.filter.typValue !== '') {
            if (this.markerArray[index].typ !== this.addTruckService.filter.typValue) {
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
              for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
                if(this.markerArray[colorIndex + 1].color === "white") {
                  this.markerArray[colorIndex].color = "grey";
                } else {
                  this.markerArray[colorIndex].color = "white";
                }
              }
        this.addTruckService.changeMessageMapa('scan');
              continue;
            }
          }
          if (this.addTruckService.filter.rodzajValue !== '') {
            if (this.markerArray[index].rodzaj !== this.addTruckService.filter.rodzajValue) {
              this.markerArray.splice(index, 1);
              this.addTruckService.pojazdy = this.markerArray.length;
              for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
                if(this.markerArray[colorIndex + 1].color === "white") {
                  this.markerArray[colorIndex].color = "grey";
                } else {
                  this.markerArray[colorIndex].color = "white";
                }
              }
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
              for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
                if(this.markerArray[colorIndex + 1].color === "white") {
                  this.markerArray[colorIndex].color = "grey";
                } else {
                  this.markerArray[colorIndex].color = "white";
                }
              }
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
            for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
              if(this.markerArray[colorIndex + 1].color === "white") {
                this.markerArray[colorIndex].color = "grey";
              } else {
                this.markerArray[colorIndex].color = "white";
              }
            }
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
         for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
          if(this.markerArray[colorIndex + 1].color === "white") {
            this.markerArray[colorIndex].color = "grey";
          } else {
            this.markerArray[colorIndex].color = "white";
          }
        }
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
          for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
            if(this.markerArray[colorIndex + 1].color === "white") {
              this.markerArray[colorIndex].color = "grey";
            } else {
              this.markerArray[colorIndex].color = "white";
            }
          }
        this.addTruckService.changeMessageMapa('scan');
          continue;
        }
        
      }
      this.addTruckService.pojazdy = this.markerArray.length;
      for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
        if(this.markerArray[colorIndex + 1].color === "white") {
          this.markerArray[colorIndex].color = "grey";
        } else {
          this.markerArray[colorIndex].color = "white";
        }
      }
        this.addTruckService.changeMessageMapa('scan');
    }
  }
     );
     if (this.stompClient) {
       this.stompClient.disconnect();
     }
     this.stompClient = this.addTruckService.connect();
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/notification', notifications => {
        this.notifications = JSON.parse(notifications.body);
        if (this.notifications.msg === "createTruck") {
          this.updateTruck(this.notifications.count, false);
        }
        if (this.notifications.msg === "deleteTruck") {
          this.deleteTruck(this.notifications.count);
        }
        if (this.notifications.msg === "updateTruck") {
          this.putTruck(this.notifications.count);
        }
        this.notifications.count =0;
        this.notifications.msg = '';
      })
    }); 

   this.addTruckService.trucksCount = this.markerArray.length;
 
    
  }


  ngAfterContentInit() {
    
    
    this.reloadData();
    
    
  }

  ngOnInit() {
    this.circleShowed = false;
  }

  
  ngOnDestroy() {
  this.stompClient.disconnect()
  }

  ngDoCheck() {
    var change = this.differ.diff(this.markerArray);
    if(change) {
      var data = this.dataSource.data;
      data = [...this.markerArray]
      this.dataSource.data  = data
   
    }
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
        if (this.newTruck.created) {
        var realTimeSplited = this.newTruck.created.split(" ")
        var realTime = realTimeSplited[0] + ' godz. ' + realTimeSplited[1]
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
          markerOpened: false,
          color: 'white',
          created: realTime
        });

       
        for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
          if(this.markerArray[colorIndex + 1].color === "white") {
            this.markerArray[colorIndex].color = "grey";
          } else {
            this.markerArray[colorIndex].color = "white";
          }
        }

        this.showMarkers = true;
        this.savedMarkers = [...this.markerArray]
        this.addTruckService.pojazdy = this.markerArray.length;
        for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
          if(this.markerArray[colorIndex + 1].color === "white") {
            this.markerArray[colorIndex].color = "grey";
          } else {
            this.markerArray[colorIndex].color = "white";
          }
        }
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
        if(this.addTruckService.listToggle === true) {
        this.addTruckService.listToggle = false;
        }
        this.listToggle = this.addTruckService.listToggle;
        this.addTruckService.mapaToggle = true;
        this.mapaToggle = this.addTruckService.mapaToggle;
        this.addTruckService.changeMessageMapa('changeToggle');
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
  showEditedToast() {
    const toastrLatitude = this.newTruck.latitude;
    const toastrLongitude = this.newTruck.longitude;
    const markerId = this.newTruck.id;
    this.toastr.warning(
      ` ${this.newTruck.truckCompanyName} `,
      `${this.newTruck.truckAdres} \ 
       ${this.newTruck.truckRodzaj} ${this.newTruck.truckTyp} \ `,
      ).onTap.pipe().subscribe(() => {
        this.addTruckService.toastrClicked = true;
        if(this.addTruckService.listToggle === true) {
        this.addTruckService.listToggle = false;
        }
        this.listToggle = this.addTruckService.listToggle;
        this.addTruckService.mapaToggle = true;
        this.mapaToggle = this.addTruckService.mapaToggle;
        this.addTruckService.changeMessageMapa('changeToggle');
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

  showToastDelete(truckCompanyName: string, truckAdres: string,  truckRodzaj: string, truckTyp: string) {
    this.toastr.error(
      ` ${truckCompanyName} `,
      `${truckAdres} \ 
       ${truckRodzaj} ${truckTyp} \ `,
      );
  }
  updateTruck(id: number, bool: boolean) {
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


  var realTimeSplited = this.newTruck.created.split(" ")
  var realTime = realTimeSplited[0] + ' godz. ' + realTimeSplited[1]
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
    markerOpened: false,
    color: 'white',
    created: realTime
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

        var realTimeSplited = this.newTruck.created.split(" ")
        var realTime = realTimeSplited[0] + ' godz. ' + realTimeSplited[1]
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
       markerOpened: false,
       color: 'white',
       created: realTime
     });

  

     if (this.circleShowed === true) {
       if (this.circleColor === 'red') {
         this.circleColor = '#0081ba';
       }
     }
     if (bool === false) {
     this.showToast();
     }
     if (bool === true) {
       this.showEditedToast();
     }
     this.addTruckService.pojazdy = this.markerArray.length;
     for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
      if(this.markerArray[colorIndex + 1].color === "white") {
        this.markerArray[colorIndex].color = "grey";
      } else {
        this.markerArray[colorIndex].color = "white";
      }
    }
     this.addTruckService.changeMessageMapa('scan');
     for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
      if(this.markerArray[colorIndex + 1].color === "white") {
        this.markerArray[colorIndex].color = "grey";
      } else {
        this.markerArray[colorIndex].color = "white";
      }
    }
   });
    }
    initiateDeleteTruck(msg: Marker) {
      this.addTruckService.deleteTruckById(msg.id)
      .subscribe(data => console.log(data), error =>  console.log(error));
    }
    initiateDeleteTruckLista(id) {
      this.addTruckService.deleteTruckById(id)
      .subscribe(data => console.log(data), error =>  console.log(error));
    }
    deleteTruck(id: number) {
       var companyName ;
       var adres;
       var rodzaj;
       var typ;
      for (var deleteIndex = this.markerArray.length -1 ; deleteIndex > -1; deleteIndex -= 1) {
        if (this.markerArray[deleteIndex].id === id) {
         companyName = this.markerArray[deleteIndex].companyName;
         adres = this.markerArray[deleteIndex].adres;
         rodzaj = this.markerArray[deleteIndex].rodzaj;
         typ = this.markerArray[deleteIndex].typ;

          this.markerArray.splice(deleteIndex, 1); 
        }
      }
      const index2 = this.savedMarkers.findIndex(marker => marker.id === id);
      this.savedMarkers.splice(index2, 1)

      if (this.circleShowed === true) {
        if (this.markerArray.length === 0) {
          this.circleColor = 'red'
        }
      }
      this.showToastDelete(companyName, adres, rodzaj, typ);
      this.addTruckService.pojazdy = this.markerArray.length;
      for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
        if(this.markerArray[colorIndex + 1].color === "white") {
          this.markerArray[colorIndex].color = "grey";
        } else {
          this.markerArray[colorIndex].color = "white";
        }
      }
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

    isOdd(num) {
      return num % 2;
    }

   sortClicked() {
     
    this.markerArray = this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort)
    for(var colorIndex = this.markerArray.length -2; colorIndex > -1; colorIndex -= 1) {
      if(this.markerArray[colorIndex + 1].color === "white") {
        this.markerArray[colorIndex].color = "grey";
      } else {
        this.markerArray[colorIndex].color = "white";
      }
    }
 
   }

   mapShowTruck(id) {
    if(this.addTruckService.listToggle === true) {
      this.addTruckService.listToggle = false;
      }
      this.listToggle = this.addTruckService.listToggle;
      this.addTruckService.mapaToggle = true;
      this.mapaToggle = this.addTruckService.mapaToggle;
      this.addTruckService.changeMessageMapa('changeToggle');
      for(var showIndex = this.markerArray.length -1; showIndex > -1; showIndex -= 1) {
        if(this.markerArray[showIndex].id === id) {
          this.addTruckService.position.latitude = this.markerArray[showIndex].lat;
          this.addTruckService.position.longitute = this.markerArray[showIndex].lng;
          this.addTruckService.position.zoom = 8;
          this.addTruckService.changeMessageMapaPosition('set');
          this.markerArray[showIndex].markerOpened = true;
        }
      }
   }

   editTruck(truck) {
        this.addTruckService.editTruckLongitude = truck.lng;
        this.addTruckService.editTruckLatitude = truck.lat;
        this.addTruckService.editTruckEmail = truck.email;
        this.addTruckService.editTruckId = truck.id;
        this.addTruckService.editTruckFirstName = truck.firstName;
        this.addTruckService.editTruckLastName = truck.lastName;
        this.addTruckService.editTruckTel = truck.tel;
        this.addTruckService.editTruckTransId = truck.transId;
        this.addTruckService.editTruckCompanyName = truck.companyName;
        this.addTruckService.editTruckWolnyOd = truck.wolnyOd;
        this.addTruckService.editTruckWolnyDo = truck.wolnyDo;
        this.addTruckService.editTruckAdres = truck.adres;
        this.addTruckService.editTruckTyp = truck.typ;
        this.addTruckService.editTruckRodzaj = truck.rodzaj;
        this.addTruckService.editTruckAdr = truck.adr;
        this.addTruckService.editTruckWinda = truck.winda;
        this.addTruckService.editTruckEdscha = truck.edscha;
        this.addTruckService.editTruckCerXl = truck.cerXl;
        this.addTruckService.editTruckUwagi = truck.uwagi;
        this.addTruckService.editTruckKraj = truck.kraj;
        this.addTruckService.editTruckCreated = truck.created;
        var counting = 0;
        this.addTruckService.changeMessageEditTruck('edit'); 
   }

   putTruck(id) {
     for(var updateIndex = this.markerArray.length -1; updateIndex > -1; updateIndex -= 1) {
       if(this.markerArray[updateIndex].id === id) {
         this.markerArray.splice(updateIndex, 1);
       }
     }
     for(var updateSavedIndex = this.savedMarkers.length -1; updateSavedIndex > -1; updateSavedIndex -= 1) {
      if(this.savedMarkers[updateSavedIndex].id === id) {
        this.savedMarkers.splice(updateIndex, 1);
      }
    }
    this.updateTruck(id, true);
   }
   
   

  }

  


