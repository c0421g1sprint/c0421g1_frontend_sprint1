import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListStudentByTeacherService {

  private API = 'http://localhost:8080/api/teachers/listStudentByTeacher';

  constructor(public httpClient: HttpClient) {
  }

  getListStudentByIdTeacher(nameTeacher: string, page: number): Observable<any>{
    return this.httpClient.get<any>(this.API +  '/?userName=' + nameTeacher + '&page=' + page);
  }
}
