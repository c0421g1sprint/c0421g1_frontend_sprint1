import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStudent} from "../../entity/IStudent";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost:8080/api/students";

  constructor(private httpClient: HttpClient) {
  }

  //DungNM - lấy danh sách classroom từ API
  getAllClassroom(): Observable<any> {
    return this.httpClient.get(this.url + "/get-all-classroom");
  }

  //DungNM - lấy danh sách grade từ API
  getAllGrade(): Observable<any> {
    return this.httpClient.get(this.url + "/get-all-grade");
  }

  //DungNM - lấy danh sách các học sinh theo ID classroom
  getStudentsByClassroomId(classId: number, index: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + "/get-students-by-classroom-id?classId=" + classId +
      "&index=" + index + "&size=" + size);
  }

  //DungNM - xoá học sinh theo ID
  deleteStudentById(id: number): Observable<any> {
    return this.httpClient.patch(this.url + '/' + id, null);
  }

  //LamNT create
  create(newStudent: IStudent): Observable<IStudent | any> {
    return this.httpClient.post(this.url + '/add', newStudent);
  }

  // LamNT edit
  edit(editStudent: IStudent): Observable<IStudent | any> {
    return this.httpClient.patch(this.url + '/edit', editStudent);
  }

  //LamNT find by id
  findById(id: number): Observable<IStudent | any> {
    return this.httpClient.get(this.url + '/detail/' + id);
  }

  //NhatDV - tìm kiếm học sinh
  findSearch(studentName: any, studentStatus: any, index: number, size: number): Observable<IStudent|any> {
    return this.httpClient.get<any>(this.url + '/search?name=' + studentName + '&status=' + studentStatus + '&index=' + index + "&size=" + size);
  }

  // diep search student 30/10
  getAllStudentBySearch(inforStudent: any, pageable: any): Observable<any> {
    return this.httpClient.get<any>(this.url + '/searchstudent?inforStudent=' + inforStudent + '&page=' + pageable);
  }
}
