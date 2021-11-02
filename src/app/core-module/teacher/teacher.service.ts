
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ITeacher} from '../../entity/ITeacher';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = 'http://localhost:8080/api/teachers';

  private baseUrlTeacherCreate = 'http://localhost:8080/api/teachers/new';
  private baseUrlTeacherUpdate = 'http://localhost:8080/api/teachers/update';


  // private baseUrlTeacherById = 'http://localhost:8080/api/teachers';


  constructor(private http: HttpClient) {
  }

  //HaNTT, 26/20/2021 - 11:00 AM (list teacher chưa có lớp chủ nhiệm)
  findAllTeacherHasIdNull(): Observable<ITeacher[] | any>{
    return this.http.get(this.url+"/find-teacher");
  }

  // hien thi danh sach giao vien theo ten nhap vao + phong ban - LinhDN
  findAllbyAllField(pageObj: any, name: String, divisionId: Number): Observable<ITeacher[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}&divisionId=${divisionId}`);
  }

  //xoa giao vien - LinhDN
  delete(id: number, teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.patch(`${this.url}/delete/${id}`, teacher);
  }

  findAllbyName(pageObj: any, name: String): Observable<ITeacher[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}`);
  }

  // them giao vien BaoHG
  saveTeacher(teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.post(this.baseUrlTeacherCreate, teacher);
  }

  // find theo Id BaoHG
  findByIdTeacher(id: number): Observable<ITeacher | any> {
    return this.http.get(this.url + '/' + id);
  }

  // update  BaoHG
  update(teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.patch(this.baseUrlTeacherUpdate, teacher);
  }

  updateInfor(iTeacher: ITeacher | any): Observable<ITeacher | any> {
    return this.http.patch("http://localhost:8080/api/teachers/updateInFor", iTeacher);
  }

  findByAccountNameTeacher(name: String): Observable<ITeacher | any> {
    return this.http.get(this.url + '/?name=' + name);
  }

  updateInforByAccountName(iTeacher: ITeacher | any): Observable<ITeacher | any> {
    return this.http.patch(this.url + "/updateInFor/account", iTeacher);
  }


}
