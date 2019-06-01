import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../../../@theme/components';
import { AddTruckService } from '../../../add-truck/add-truck.service';

@Component({
  selector: 'ngx-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.scss']
})
export class MarkerInfoComponent implements OnInit {
  userInfo;
  constructor(private truckService: AddTruckService) { }


  ngOnInit() {
    
  }

}
