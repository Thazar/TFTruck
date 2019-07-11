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

export interface position {
  latitude: number;
  longitute: number;
  zoom: number;
}

var SockJs = require("sockjs-client")
var Stomp = require("stompjs")


@Injectable({
  providedIn: 'root'
})
export class AddTruckService {
  socket: any;
  stompClient: any
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

  position: position = {
    latitude: 49.8915943 ,
    longitute: 8.9206519,
    zoom: 6,
  }

  trucksCount: number;
  pojazdy: number;
  toastrClicked: boolean = false;
  email: string;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSourceMapa = new BehaviorSubject('default message')
  currentMessageMapa = this.messageSourceMapa.asObservable();

  private messageSourceMapaPosition = new BehaviorSubject('default message')
  currentMessageMapaPosition = this.messageSourceMapaPosition.asObservable();


  adresSelected: boolean = false;
  adresRealSelected: boolean = false;
  

  public connect() {
    this.socket = new SockJs(`http://localhost:8888/nebular/socket`)
    this.stompClient = Stomp.over(this.socket);
    return this.stompClient;
  }
  
  public disconnect() {
  this.stompClient.disconnect();
  }


  private baseUrl = 'http://localhost:8888/nebular/api/trucks';

  constructor(private http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeMessageMapa(message: string) {
    this.messageSourceMapa.next(message)
  }

  changeMessageMapaPosition(message: string) {
    this.messageSourceMapaPosition.next(message)
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
