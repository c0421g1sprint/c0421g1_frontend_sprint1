import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITeacher} from "../../../entity/ITeacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = 'http://localhost:8080/api/teachers';
  constructor(private http: HttpClient) { }
  // hien thi danh sach giao vien theo ten nhap vao + phong ban - LinhDN
  findAllbyAllField(pageObj:any,name:String,divisionId:Number): Observable<ITeacher[]|any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}&divisionId=${divisionId}`);
  }

  //xoa giao vien - LinhDN
  delete(id: number, teacher: ITeacher): Observable<ITeacher|any>  {
    return this.http.patch(`${this.url}/delete/${id}`,teacher);
  }

  findAllbyName(pageObj:any,name:String): Observable<ITeacher[]|any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}`);
  }
}
