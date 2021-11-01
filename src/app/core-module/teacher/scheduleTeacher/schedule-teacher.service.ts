import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleTeacherService {

  private API = 'http://localhost:8080/api/schedules/schedule-detail';
  constructor(public httpClient: HttpClient) {
  }

  getScheduleDetail(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API+ '/' + id);
  }
}
