import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStudent} from "../../entity/IStudent";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = "http://localhost:8080/api/students";
  private httpOptions;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  //DungNM - lấy danh sách classroom từ API
  getAllClassroom(): Observable<any> {
    console.log(this.httpOptions);
    return this.httpClient.get(this.url + "/get-all-classroom", this.httpOptions);
  }

  //DungNM - lấy danh sách grade từ API
  getAllGrade(): Observable<any> {
    return this.httpClient.get(this.url + "/get-all-grade", this.httpOptions);
  }

  //DungNM - lấy danh sách các học sinh theo ID classroom
  getStudentsByClassroomId(classId: number, index: number, size: number): Observable<any> {
    return this.httpClient.get(this.url + "/get-students-by-classroom-id?classId=" + classId +
      "&index=" + index + "&size=" + size, this.httpOptions);
  }

  //DungNM - xoá học sinh theo ID
  deleteStudentById(id: number): Observable<any> {
    return this.httpClient.patch(this.url + '/' + id, null, this.httpOptions);
  }

  //LamNT create
  create(newStudent: IStudent): Observable<IStudent | any> {
    return this.httpClient.post(this.url + '/add', newStudent, this.httpOptions);
  }

  // LamNT edit
  edit(editStudent: IStudent): Observable<IStudent | any> {
    return this.httpClient.patch(this.url + '/edit', editStudent, this.httpOptions);
  }

  //LamNT find by id
  findById(id: number): Observable<IStudent | any> {
    return this.httpClient.get(this.url + '/detail/' + id, this.httpOptions);
  }

  //Danh
  // findById(id: number): Observable<IStudent | any> {
  //   return this.httpClient.get(this.url + '/find-student/' + id);
  // }


  //NhatDV - tìm kiếm học sinh
  findSearch(studentName: any, studentStatus: any, index: number, size: number): Observable<IStudent | any> {
    return this.httpClient.get<any>(this.url + '/search?name=' + studentName + '&status=' + studentStatus + '&index=' + index + "&size=" + size);
  }

//HaNTT, 26/20/2021 - 11:00 AM (list student chưa có lớp)
  getStudentWhereClassIdNull(): Observable<IStudent[] | any> {
    return this.httpClient.get(`${this.url}/find-student`, this.httpOptions)
  }

}
