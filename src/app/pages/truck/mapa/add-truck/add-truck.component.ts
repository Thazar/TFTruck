import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Truck } from './truck';
import { AddTruckService } from './add-truck.service';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MarkersComponent } from '../markers/markers.component';

import { MapaService } from '../mapa.service';
import { NbWindowRef } from '@nebular/theme';


export interface State {
  flag: string;
  name: string;
  short: string;
}
export interface typ {
  value: string;
  viewValue: string;
}

export interface spec {
  value: string;
  viewValue: string;
}

@Component({
  providers:[ MarkersComponent ],
  selector: 'ngx-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent  {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  truck: Truck = new Truck();
  public selectedAddress: PlaceResult;
  public appearance = Appearance;
  value = '';
  countryShortSelected= false;
  countryNotSelected= true;
  adresValue= '';
  typValue='';
  rodzajValue='';
  countryShort;
  dateOd = new FormControl(new Date());
  dateDo = new FormControl(new Date((new Date).getTime()+ 86400000));
  created = new FormControl(new Date());
  dateOdValue;
  dateDoValue;
  truckAdr: false;
  truckWinda: false;
  truckEdscha: false;
  truckCerXl: false;
  truckUwagi: '';

 
  

  states: State[] = [
    {
      name: 'Polska',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Poland.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg',
      short: 'pl'
    },
    {
      name: 'Niemcy',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Germany.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
      short: 'de'
    },
    {
      name: 'Francja',
      // https://commons.wikimedia.org/wiki/File:Flag_of_France.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
      short: 'fr'
    },
    {
      name: 'Włochy',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Italy.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
      short: 'it'
    }
  ];
  
  types: typ[] = [
    {value: 'Firanka', viewValue: 'Firanka'},
    {value: 'Plandeka', viewValue: 'Plandeka'},
    {value: 'Chłodnia', viewValue: 'Chłodnia'},
    {value: 'Izoterma', viewValue: 'Izoterma'},
  ];

  specs: spec[] = [
    {value: 'Bus | 3.5t', viewValue: 'Bus | 3.5t'},
    {value: 'Ciężarowy | 7.5-12t', viewValue: 'Ciężarowy | 7.5-12t'},
    {value: 'Full | 40t', viewValue: 'Full | 40t'},
  ];

  constructor(private addTruckService: AddTruckService, private mapaService: MapaService, public windowRef: NbWindowRef,) {
    this.dateDoValue = this.dateDo.value;
    this.dateOdValue = this.dateOd.value;
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }
  newTruck(): void {
    this.truck = new Truck();
  }

  save() {
    console.log("truck adr bla bla bla to : " + this.truckAdr)
    this.truck.truckEmail = this.addTruckService.user.username;
    this.truck.truckWolnyOd = this.dateOdValue;
    this.truck.truckWolnyDo = this.dateDoValue;
    this.truck.truckTyp = this.typValue;
    this.truck.truckRodzaj = this.rodzajValue;
    this.truck.truckAdr = this.truckAdr;
    this.truck.truckWinda = this.truckWinda;
    this.truck.truckEdscha = this.truckEdscha;
    this.truck.truckCerXl = this.truckCerXl;
    this.truck.truckUwagi = this.truckUwagi;
    this.truck.truckKraj = this.value;
    this.truck.created = this.created.value;
    
    console.log("adresValue to :" + this.adresValue);
    this.addTruckService.createTruck(this.truck)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  onSubmit() {
    
    if (!this.truck.latitude  || !this.truck.longitude || !this.adresValue || !this.typValue || !this.rodzajValue || !this.dateOd.value || !this.dateDo.value ) {
      return
    }
    this.save();
    this.windowRef.close();
  }
  windowClose() {
    this.windowRef.close();
  }
  close() {
    this.windowRef.close();
  }


  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.truck.latitude = location.latitude;
    this.truck.longitude = location.longitude;
    console.log(this.truck.latitude, this.truck.longitude)
  }
  

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.truck.truckAdres = result.formatted_address;
  }

  countrySelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    if (event.option.value=="Polska") {
      this.countryShort='pl';
      this.countryShortSelected=true;
      this.countryNotSelected=false;
    }
    if (event.option.value=="Niemcy") {
      this.countryShort='de';
      this.countryShortSelected=true;
      this.countryNotSelected=false;
    }
    if (event.option.value=='Francja') {
      this.countryShort='fr';
      this.countryShortSelected=true;
      this.countryNotSelected=false;
    }
    console.log(this.countryShort)
  }

  clear() {
    this.value = '';
    this.countryShortSelected = false;
    this.countryNotSelected = true;
    this.value = '';
    this.countryShortSelected = false;
    this.countryNotSelected = true;
    this.truck.latitude = null;
    this.truck.latitude = null;
    this.clearAdres();
  }
  clearAdres() {
    this.adresValue = '';
  }

  

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
