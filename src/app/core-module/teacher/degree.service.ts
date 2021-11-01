import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IDegree} from "../../../entity/IDegree";

@Injectable({
  providedIn: 'root'
})
export class DegreeService {


  private baseURL = 'http://localhost:8080/api/teachers/listDegree';
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<IDegree[] | any>{
    return this.http.get(this.baseURL);
  }
}
