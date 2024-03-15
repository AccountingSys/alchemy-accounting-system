import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest } from '../models/registration-request';


const baseURL = 'http://localhost:8080/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  register(register: RegistrationRequest): Observable<any> {
    return this.http.post(baseURL + 'register', register, httpOptions);
  } 

  login(login: LoginRequest): Observable<any> {
    return this.http.post(baseURL + 'login', login);
  }
}
