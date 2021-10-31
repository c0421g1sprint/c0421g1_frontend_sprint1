import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDivision} from "../../entity/IDivision";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private baseURL = 'http://localhost:8080/api/teachers/listDivision';
  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<IDivision[]>{
    return this.http.get<IDivision[]>(this.baseURL);
  }
}
