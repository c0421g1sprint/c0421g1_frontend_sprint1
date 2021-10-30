import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchTeacherService {

  private API_TEACHER = 'http://localhost:8080/api/teachers';


  constructor(private httpClient: HttpClient) {
  }

  // diep search teacher 26/10

  getAllTeacherBySearch(search: any, pageable: any): Observable<any> {
    return this.httpClient.get<any>(this.API_TEACHER + '/search?search=' + search + '&page=' + pageable);
  }
}
