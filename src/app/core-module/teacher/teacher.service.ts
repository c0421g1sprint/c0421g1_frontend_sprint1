import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ITeacher} from '../../entity/ITeacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private api_teacher = "http://localhost:8080/api/teachers"

  constructor(private httpClient: HttpClient) {};

  //HaNTT, 26/20/2021 - 11:00 AM (list teacher chưa có lớp chủ nhiệm)
  findAllTeacherHasIdNull(): Observable<ITeacher[] | any>{
    return this.httpClient.get(this.api_teacher+"/find-teacher");
  }
}
