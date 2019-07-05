import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { MapaService } from './mapa.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { HostListener } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { AddTruckService } from './add-truck/add-truck.service';



export interface State {
  flag: string;
  name: string;
  short: string;
}

export interface Range {
  value: number;
  viewValue: string;
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
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  screenHeight:any;
  screenWidth:any;

  selected = new FormControl(0);
  panelOpened = false;
  addationalPanelOpened = false;
  ranges: Range[] = [
    { value: 10, viewValue: '10km' },
    { value: 25, viewValue: '25km' },
    { value: 50, viewValue: '50km' },
    { value: 75, viewValue: '75km' },
    { value: 100, viewValue: '100km'},
    { value: 150, viewValue: '150km' },
    { value: 200, viewValue: '200km'},
    { value: 300, viewValue: '300km'},
    { value: 500, viewValue: '500km'},
  ];
  freeOn = new FormControl(new Date())
  stateCtrl = new FormControl();
  specyfikacje = new FormControl();
  filteredStates: Observable<State[]>;
  specSelected: [];
  tempSelected: [];
  value = '';
  empty = '';
  countryShortSelected= false;
  adressSelected= false;
  countryNotSelected= true;
  countryShort;
  adresValue= '';
  freeOnValue= '';
  typValue='';
  rodzajValue='';
  message: string;
  rangeValue: number = 5;
  listaSpecyfikacji: string[] = [
    'Adr', 'Winda', 'Edscha', 'Cer.XL'
  ];
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
      // https://commons.wikimedia.org/wiki/Fisle:Flag_of_Italy.svg
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


  ngOnInit() {
    
  console.log("czy okno jest otwarte? " + this.mapaService.loggedOfWithOpenedWindow)
  if (this.mapaService.loggedOfWithOpenedWindow == true) {
    window.location.reload();
  }
  }
   

  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService, private mapaService: MapaService, private addTruckService: AddTruckService) {
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
    this.getScreenSize();
    this.tempSelected = [];
  };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    
  }

  ref: NbWindowRef;

  openWindowWithoutBackdrop() {
    if (this.mapaService.windowOpened == true) {
      return;
    }
    this.mapaService.windowOpened = true;
    
    this.mapaService.ref = this.windowService.open(
      this.disabledEscTemplate,
      { title: 'Dodawanie Pojazdu', hasBackdrop: false, closeOnEsc: false },
    );
   this.mapaService.ref.onClose.subscribe(frames => {
     this.mapaService.windowOpened = false;
   });
  }
f
  close() {
    this.mapaService.ref.close;
  }
  togglePanel() {
    if (this.panelOpened === false ) {
    this.panelOpened = true;
    } else  {
      this.panelOpened = false;
      this.addationalPanelOpened = false;
    }
  }
  toggleAddationalPanel() {
    if (this.addationalPanelOpened === false) {
      this.addationalPanelOpened = true;
    } else  {
      this.addationalPanelOpened = false; 
    }
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

  onLocationSelected(location: Location) {
    this.adressSelected = true;
    this.addTruckService.filter.lat = location.latitude;
    this.addTruckService.filter.lng = location.longitude;
    this.addTruckService.adresSelected = true;
  }
  

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.adressSelected = true;

  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  @ViewChild("krajInput") nameField: ElementRef;
  clearKraj(): void {
    this.value = '';
    this.clearAdres();
    this.countryShortSelected = false;
    this.addTruckService.adresSelected = false;
    
    
  }
  clearAdres() {
    this.adresValue = '';
    this.adressSelected = false;
    this.addTruckService.adresSelected = false;
  }
  clearFreeOn() {
    this.freeOnValue = '';
  }
  clearAll() {
    this.clearKraj();
    this.clearFreeOn();
    this.typValue = '';
    this.rodzajValue = '';
    this.specSelected = [];

  }
  search() {
    if (this.specSelected === undefined) {
      console.log("no kurwa puste do chuja")
    }
    console.log('clicked search')
    this.addTruckService.filter.kraj = this.value;
    this.addTruckService.filter.range = this.rangeValue;
    this.addTruckService.filter.typValue = this.typValue;
    this.addTruckService.filter.rodzajValue = this.rodzajValue;
    this.addTruckService.filter.specSelected = this.specSelected;
    this.addTruckService.filter.freeOn.setValue(this.freeOnValue);
    this.addTruckService.changeMessage('search');
    console.log(this.specSelected)

  }

 
}
