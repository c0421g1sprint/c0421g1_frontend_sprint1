import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../../feature-module/account/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_LOGIN = "http://localhost:8080/api/public/";
  private
  constructor(private http:HttpClient) {}

  getLogin(data: Login):Observable<any>{
    return  this.http.post(this.API_LOGIN + "login", data )
  }

  getPassword(email: string){
    return  this.http.get(this.API_LOGIN + "refreshPassword?email=" + email);
  }
}
