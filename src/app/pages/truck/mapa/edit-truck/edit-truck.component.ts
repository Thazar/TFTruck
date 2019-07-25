import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';


@Component({
  selector: 'ngx-edit-truck',
  templateUrl: './edit-truck.component.html',
  styleUrls: ['./edit-truck.component.scss']
})
export class EditTruckComponent implements OnInit {
  


  constructor(public windowRef: NbWindowRef,) { 

  }

  ngOnInit() {
  }
  
  
  close() {
    this.windowRef.close();
  }

}
