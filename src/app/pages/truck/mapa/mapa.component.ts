import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { MapaService } from './mapa.service';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  

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

  close() {
    this.mapaService.ref.close;
  }
}
