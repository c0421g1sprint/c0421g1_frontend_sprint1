import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleTeacherService {

  private API = 'http://localhost:8080/api/teachers/schedule';

  getScheduleDetail(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API+ '?userName=' + username);
  }

  constructor(public httpClient: HttpClient) {
  }
}
