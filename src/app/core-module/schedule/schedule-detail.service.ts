import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailService {
  private API = 'http://localhost:8080/api/schedules';
  constructor(public httpClient: HttpClient) {
  }

  getScheduleDtailByClassId(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API + '/schedule-classroom' +  '/' + id);
  }

  getAllClassroom(): Observable<any>{
    return this.httpClient.get<any>(this.API + '/classroom-exist');
  }

  getAllGrade(): Observable<any>{
    return this.httpClient.get<any>(this.API + '/grades');
  }
}
