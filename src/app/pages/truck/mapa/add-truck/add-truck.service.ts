import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface filter {
  kraj: string;
  lat: number;
  lng: number;
  range: number;
  freeOn: FormControl;
  typValue: string;
  rodzajValue: string;
  specSelected: [];
}

var SockJs = require("sockjs-client")
var Stomp = require("stompjs")

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {
  filter: filter = {
    kraj: '',
    lat: 0,
    lng: 0,
    range: 5,
    freeOn:  new FormControl(new Date()),
    typValue: '',
    rodzajValue: '',
    specSelected: [],
  }

  trucksCount: number;
  
  email: string;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  adresSelected: boolean = false;
  adresRealSelected: boolean = false;
  

  public connect() {
    let socket = new SockJs(`http://localhost:8888/nebular/socket`)
    let stompClient = Stomp.over(socket);
    return stompClient;
  }

  private baseUrl = 'http://localhost:8888/nebular/api/trucks';

  constructor(private http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  createTruck(truck: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, truck);
  }
  getAllTrucks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getTruckById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  deleteTruckById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
