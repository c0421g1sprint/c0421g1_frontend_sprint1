import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {INews} from "./INews";
import {INewsType} from "./INewsType";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsUrlApi = 'http://localhost:8080/api/news';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findAll(page: number): Observable<INews[]> {
    return this.httpClient.get<INews[]>(this.newsUrlApi  + '?page=' + page);
  }

  createNews(news: INews): Observable<INews> {
    return this.httpClient.post<INews>(this.newsUrlApi + '/create', news);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get<INews>(this.newsUrlApi + '/read/' + id, this.httpOptions).pipe();
  }

  deleteNews(id: number): Observable<any> {
    return this.httpClient.delete(this.newsUrlApi + '/delete/' + id);
  }
}
