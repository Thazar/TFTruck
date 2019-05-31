import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {

  private baseUrl = 'http://localhost:8080/api/trucks';

  constructor(private http: HttpClient) { }

  createTruck(truck: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, truck);
  }
  getAllTrucks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
