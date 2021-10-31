import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ITeacher} from '../../entity/ITeacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  updateInfor( iTeacher: ITeacher | any): Observable<ITeacher |any> {
    return this.httpClient.patch("http://localhost:8080/api/teachers/updateInFor", iTeacher);
  }

  findById(id: number| any): Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/teachers/" + id)
  }
}
