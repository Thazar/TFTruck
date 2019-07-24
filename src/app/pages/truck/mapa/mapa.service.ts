import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NbWindowRef } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
  
})
export class MapaService {
  windowOpened: boolean = false;
  edytujWindowOpened: boolean = false;
  ref: NbWindowRef;
  loggedOfWithOpenedWindow: boolean;

  constructor() { }


  
 
}
