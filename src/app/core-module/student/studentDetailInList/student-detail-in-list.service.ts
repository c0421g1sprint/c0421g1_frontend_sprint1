import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentDetailInListService {

  private API = 'http://localhost:8080/api/teachers/detail';
  constructor(public httpClient: HttpClient) {
  }

  studentDetailInList(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API+ '/' + id);
  }
}
