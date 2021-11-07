
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ITeacher} from '../../entity/ITeacher';
import {StorageService} from "../account/storage.service";
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = 'http://localhost:8080/api/teachers';
  private baseUrlTeacherCreate = 'http://localhost:8080/api/teachers/new';
  private baseUrlTeacherUpdate = 'http://localhost:8080/api/teachers/update';
  private httpOptions;


  constructor(private http: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  // diep search teacher 00h25 ngày 3/11
  // getAllTeacherBySearch(search: any, pageable: any): Observable<any> {
  //   return this.http.get<any>(this.url + '/search?search=' + search + '&page=' + pageable, this.httpOptions);
  // }
  getAllTeacherBySearch(search: any, division: any, pageable: any): Observable<ITeacher | any> {
    return this.http.get<any>(this.url + '/search?search=' + search + '&division=' + division + '&page=' + pageable);
  }

  //HaNTT, 26/20/2021 - 11:00 AM (list teacher chưa có lớp chủ nhiệm)
  findAllTeacherHasIdNull(): Observable<ITeacher[] | any>{
    return this.http.get(this.url+"/find-teacher", this.httpOptions);
  }

  // hien thi danh sach giao vien theo ten nhap vao + phong ban - LinhDN
  findAllbyAllField(pageObj: any, name: String, divisionId: Number): Observable<ITeacher[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}&divisionId=${divisionId}`, this.httpOptions);
  }

  //xoa giao vien - LinhDN
  delete(id: number, teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.patch(`${this.url}/delete/${id}`, teacher, this.httpOptions);
  }

  findAllbyName(pageObj: any, name: String): Observable<ITeacher[] | any> {
    return this.http.get(`${this.url}/list?page=${pageObj.page}&size=${pageObj.size}&name=${name}`, this.httpOptions);
  }

  // them giao vien BaoHG
  saveTeacher(teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.post(this.baseUrlTeacherCreate, teacher, this.httpOptions);
  }

  // find theo Id BaoHG
  findByIdTeacher(id: number): Observable<ITeacher | any> {
    return this.http.get(this.url + '/' + id, this.httpOptions);
  }

  // update  BaoHG
  update(teacher: ITeacher): Observable<ITeacher | any> {
    return this.http.patch(this.baseUrlTeacherUpdate, teacher, this.httpOptions);
  }

  updateInfor(iTeacher: ITeacher | any): Observable<ITeacher | any> {
    return this.http.patch("http://localhost:8080/api/teachers/updateInFor", iTeacher, this.httpOptions);
  }

  findByAccountNameTeacher(name: String): Observable<ITeacher | any> {
    return this.http.get(this.url + '/?name=' + name, this.httpOptions);
  }

  updateInforByAccountName(iTeacher: ITeacher | any): Observable<ITeacher | any> {
    return this.http.patch(this.url + "/updateInFor/account", iTeacher, this.httpOptions);
  }


}
