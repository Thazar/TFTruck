import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Truck } from './truck';
import { AddTruckService } from './add-truck.service';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MarkersComponent } from '../map/markers/markers.component';
import { NbWindowService } from '@nebular/theme';
import { MapaService } from '../mapa.service';


export interface State {
  flag: string;
  name: string;
  short: string;
}
export interface typ {
  value: string;
  viewValue: string;
}

@Component({
  providers:[ MarkersComponent ],
  selector: 'ngx-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  truck: Truck = new Truck();
  public selectedAddress: PlaceResult;
  public appearance = Appearance;

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
  value = '';
  adresValue= '';
  valueOd='';
  valueDo='';
  countryShort;
  countryShortSelected= false;
  countryNotSelected= true;
  tracking: Truck;
  
  foods: typ[] = [
    {value: 'firanka-0', viewValue: 'Firanka'},
    {value: 'plandeka-1', viewValue: 'Plandeka'},
    {value: 'chłodnia-2', viewValue: 'Chłodnia'},
    {value: 'izoterma-3', viewValue: 'Izoterma'},
  ];

  constructor(private addTruckService: AddTruckService, private mapaService: MapaService) {
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
    this.truck.email = this.addTruckService.email;
    this.addTruckService.createTruck(this.truck)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  onSubmit() {
    this.save();
    this.mapaService.ref.close();
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.truck.latitude = location.latitude;
    this.truck.longitude = location.longitude;
    console.log(this.truck.latitude, this.truck.longitude)
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
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
  }

  

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
