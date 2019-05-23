import { Component, TemplateRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { NbWindowService } from '@nebular/theme';

@Component({
    selector: 'ngx-mapa',
    styleUrls: ['./mapa.component.scss'],
    templateUrl: './mapa.component.html', 
  })
export class MapaComponent {
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService) {}

  openWindowWithoutBackdrop() {
    this.windowService.open(
      this.disabledEscTemplate,
      { title: 'Wolne Auto', hasBackdrop: false, closeOnEsc: false },
    );
  }
      options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      ],
      zoom: 5,
      center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
    };
  }