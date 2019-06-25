import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { MapaService } from './mapa.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  selected = new FormControl(0);
  panelOpened = false;
  addationalPanelOpened = false;
  ranges: string[] = [
    '10km', '25km', '50km', '75km', '100km', '150km', '200km', '300km', '500km'
  ];
  freeOn = new FormControl(new Date())


  ngOnInit() {
  console.log("czy okno jest otwarte? " + this.mapaService.loggedOfWithOpenedWindow)
  if (this.mapaService.loggedOfWithOpenedWindow == true) {
    window.location.reload();
  }
  }
   

  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService, private mapaService: MapaService) {};
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
}
