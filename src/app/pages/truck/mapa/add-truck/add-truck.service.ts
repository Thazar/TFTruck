import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export interface filter {
  kraj: string;
  lat: number;
  lng: number;
  range: number;

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
  }
  email: string;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  countrySelected: boolean = false;
  

  public connect() {
    let socket = new SockJs(`https://tftruck.herokuapp.com/nebular/socket`)
    let stompClient = Stomp.over(socket);
    return stompClient;
  }

  private baseUrl = 'https://tftruck.herokuapp.com/nebular/api/trucks';

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
