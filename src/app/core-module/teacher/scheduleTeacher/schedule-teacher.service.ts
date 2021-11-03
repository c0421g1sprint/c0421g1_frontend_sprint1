import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ScheduleTeacherService {

  private API = 'http://localhost:8080/api/teachers/schedule';
  private httpOptions;


  constructor(public httpClient: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }
  getScheduleDetail(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API+ '?userName=' + username, this.httpOptions);
  }
}
