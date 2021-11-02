import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMark} from "../../entity/IMark";



@Injectable({
  providedIn: 'root'
})
export class MarkService {

  //MinhNN update 2/11
  url = "http://localhost:8080/api/marks"

  constructor(private httpClient: HttpClient) {
  }

  getAll(currentPage: number): Observable<IMark | any> {
    return this.httpClient.get(this.url + "/list" + "?page=" + currentPage);
  }

  findById(id: number | any): Observable<IMark | any> {
    return this.httpClient.get(this.url + "/" + id);
  }

  update(iMark: IMark | any): Observable<IMark | any> {
    return this.httpClient.patch(this.url + "/edit", iMark)
  }

  searchMark(page: number, nameStudent: String | any, nameClass: String | any, subjectId: number | any): Observable<IMark[] | any> {
    return this.httpClient.get(this.url + "/search" + "?nameStudent=" + nameStudent + "&nameClass=" + nameClass + "&subjectId=" + subjectId + "&page=" + page)
  }
}
