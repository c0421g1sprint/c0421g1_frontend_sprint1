import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../account/storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  private httpOptions;

  private baseURL = 'http://localhost:8080/api/teachers/listDegree';
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }

  }

  findAll(): Observable<any>{
    return this.http.get(this.baseURL, this.httpOptions);
  }
}
