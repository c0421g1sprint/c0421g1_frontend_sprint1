import {Injectable} from '@angular/core';
​
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMark} from "../../entity/IMark";
import {StorageService} from "../account/storage.service";

​
@Injectable({
  providedIn: 'root'
})
export class MarkService {
​
​
  url = "http://localhost:8080/api/marks"
  private httpOptions;
​
  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
​
  }
​
  getAll(currentPage: number): Observable<IMark | any> {
    return this.httpClient.get(this.url + "/list" + "?page=" + currentPage, this.httpOptions);
  }
​
  findById(id: number | any): Observable<IMark | any> {
    return this.httpClient.get(this.url + "/" + id, this.httpOptions);
  }
​
  update(iMark: IMark | any): Observable<IMark | any> {
    return this.httpClient.patch(this.url + "/edit", iMark, this.httpOptions)
  }
​
  searchMark(page: number, nameStudent: String | any, subjectId: number | any, classId: number | any): Observable<IMark[] | any> {
    return this.httpClient.get(this.url + "/search" + "?page=" + page + "&nameStudent=" + nameStudent + "&subjectId=" + subjectId + "&classId=" + classId, this.httpOptions)
​
  }
}
