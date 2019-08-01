import { Component, OnInit, ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { RegComponent } from './reg/reg.component'

import { User } from '../../models/User';

import { NbRegisterComponent } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends NbRegisterComponent {
  httpClient: HttpClient;
  count: number = 0;
  user: User = new User();
  register() {
    this.count = 1;
  }



}
