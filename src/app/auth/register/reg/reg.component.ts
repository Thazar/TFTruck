import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../models/User';
import { RegisterService } from '../register.service';



@Component({
  selector: 'ngx-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit, OnChanges {

@Input() user: User;
@Input() count: Number;
  constructor( private registerService: RegisterService ) { }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'count') {
        if(changes[property].currentValue === 1) {
          console.log(this.user.userFullName);
          this.registerService.register(this.user)
          .subscribe(data => console.log(data), error => console.log(error));
        }
      }
    }
  }
  ngOnInit() {
    console.log('wczytujemy')
  }

}
