import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {INewsType} from "./INewsType";

@Injectable({
  providedIn: 'root'
})
export class NewsTypeService {

  private newsUrlApi = 'http://localhost:8080/api/news/type-list';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findAll(): Observable<INewsType[]> {
    return this.httpClient.get<INewsType[]>(this.newsUrlApi);
  }
}
