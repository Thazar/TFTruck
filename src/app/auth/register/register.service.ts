import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:8888/nebular';

  constructor( private http: HttpClient ) { }

  register(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/sign-up`, user);
  }
}
