import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {
   

  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService) {};

  openWindowWithoutBackdrop() {
    this.windowService.open(
      this.disabledEscTemplate,
      { title: 'Dodawanie Pojazdu', hasBackdrop: false, closeOnEsc: false },
    );
  }
}
