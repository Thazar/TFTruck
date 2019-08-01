import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

import { User } from '../../../../Models/User';

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
 
  user: User;

  socket: any;
  stompClient: any
  mapaToggle: boolean;
  listToggle: boolean;
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

  editTruckLongitude: number;
  editTruckLatitude: number;
  editTruckEmail: string;
  editTruckId: number;
  editTruckFirstName: string;
  editTruckLastName: string;
  editTruckTel: string;
  editTruckTransId: string;
  editTruckCompanyName: string;
  editTruckCompanyNip: string;
  editTruckWolnyOd: string;
  editTruckWolnyDo: string;
  editTruckAdres: string;
  editTruckTyp: string;
  editTruckRodzaj: string;
  editTruckAdr: string;
  editTruckWinda: string;
  editTruckEdscha: string;
  editTruckCerXl: string;
  editTruckUwagi: '';
  editTruckKraj: string;
  editTruckCreated: string;

  
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

  private messageSourceEditTruck = new BehaviorSubject('default message')
  currentMessageEditTruck = this.messageSourceEditTruck.asObservable();


  adresSelected: boolean = false;
  adresRealSelected: boolean = false;
  

  public connect() {
    let socket = new SockJs(`https://tftruck.herokuapp.com/nebular/socket`)
    let stompClient = Stomp.over(socket);
    return stompClient;
  }
  


<<<<<<< HEAD
  private baseUrl = 'https://tftruck.herokuapp.com/nebular/api/trucks';
=======
  private baseUrl = 'http://localhost:8888/nebular/api/trucks';
  private userUrl = 'http://localhost:8888/nebular/api';
>>>>>>> feature

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

  changeMessageEditTruck(message: string) {
    this.messageSourceEditTruck.next(message)
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
  updateTruckById(id: number, truck: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, truck)
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.userUrl}/user/${email}`)
  }
}
