import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

var SockJs = require("sockjs-client")
var Stomp = require("stompjs")

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {
  email: string;

  public connect() {
    let socket = new SockJs(`http://localhost:8888/nebular/socket`)
    let stompClient = Stomp.over(socket);
    return stompClient;
  }

  private baseUrl = 'http://localhost:8888/nebular/api/trucks';

  constructor(private http: HttpClient) { }

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
