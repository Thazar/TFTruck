import { Component, OnInit } from '@angular/core';
import { Truck } from '../truck';
import { AddTruckService } from '../add-truck.service';


@Component({
  selector: 'ngx-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.scss']
})
export class CreateTruckComponent implements OnInit {
  
  truck: Truck = new Truck();
  submitted = false;

  constructor(private addTruckService: AddTruckService) { }

  ngOnInit() {
  }

  newTruck(): void {
    this.submitted = false;
    this.truck = new Truck();
  }

  save() {
    this.addTruckService.createTruck(this.truck)
    .subscribe(data => console.log(data), error => console.log(error));
    this.truck = new Truck();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
