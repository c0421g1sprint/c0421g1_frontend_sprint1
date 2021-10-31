import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListStudentByTeacherService {

  private API = 'http://localhost:8080/api/teachers/list';

  constructor(public httpClient: HttpClient) {
  }

  getListStudentByIdTeacher(id: any, page: any): Observable<any>{
    return this.httpClient.get<any>(this.API +  '/' + id + '?page=' + page);
  }
}
