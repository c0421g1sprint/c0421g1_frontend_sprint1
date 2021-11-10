import  { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleTeacherService {
  private API = 'http://localhost:8080/api/teachers/schedule';
  getScheduleDetail(userName: any): Observable<any> {
    return this.httpClient.get<any>(this.API+ '/?userName=' + userName);
  }
  constructor(public httpClient: HttpClient) {
  }
}
