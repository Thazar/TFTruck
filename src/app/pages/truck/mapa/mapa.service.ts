import { Injectable } from '@angular/core';

import { NbWindowRef } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class MapaService {
  windowOpened: boolean;

  constructor() { }
  ref: NbWindowRef;
}
