import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IClassroom} from "../../entity/IClassroom";
import {IStudent} from "../../entity/IStudent";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
//nhớ thêm http vào url đi th nguuu
  //DanhNT coding
  private api_classroom = 'http://localhost:8080/api/classroom';

  constructor(private httpClient: HttpClient) {
  }

  //HaNTT, 27/20/2021 - 1:40 AM  (truyền classNane từ component Nhập tên lớp --> cponent inputInfo)
  private classNameService = new BehaviorSubject('');
  currentClassName = this.classNameService.asObservable();
  changeClassName(name: string) {
    this.classNameService.next(name);
  }

//HaNTT, 27/20/2021 - 22:50 pm  (truyền checkedListStudent từ checkBox-dialog --> inputInfo component)
  list: IStudent[] = [];
  private studentCheckedList = new BehaviorSubject(this.list);
  currentStudentCheckedList = this.studentCheckedList.asObservable();
  changeStudentCheckedList(studentList: IStudent[]) {
    this.studentCheckedList.next(studentList);
  }

  // //HaNTT, 27/20/2021 - 22:50 pm  (truyền newStudentObj từ create-dialog --> inputInfo component)
  newStudentId: number;
  private studentIdService = new BehaviorSubject(this.newStudentId);
  currentStudentId = this.studentIdService.asObservable();
  changeStudentId(id: number) {
    this.studentIdService.next(id);
  }

//HaNTT, 26/20/2021 - 11:00 AM
//check lớp trùng:
  isClassDuplicated(name: String, schoolYear: String): Observable<IClassroom | any> {
    return this.httpClient.get(`${this.api_classroom}/find-class-room?name=${name}&schoolYear=${schoolYear}`)
  }

//HaNTT, 26/20/2021 - 11:00 AM
//create:
  //localhost:8080/api/classroom/create
  createClass(classObj: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.post(`${this.api_classroom}/create`, classObj);
  }

  //DanhNT coding
  findAllClassroom(currentPage: number): Observable<IClassroom[] | any> {
    return this.httpClient.get(this.api_classroom + '?page=' + currentPage);
  }

  //DanhNT coding
  findClassroomById(id: number): Observable<IClassroom | any> {
    return this.httpClient.get(this.api_classroom + '/get-classroom/' + id);
  }

  //DanhNT coding
  updateClass(IClassroom: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.patch(this.api_classroom + '/edit', IClassroom);
  }

  //DanhNT coding
  promoteClass(IClassroom: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.put(this.api_classroom + '/promote',IClassroom);
  }

  //DanhNT coding
  findClassroomByNameAndSchoolYear(name: string, schoolYear: string): Observable<IClassroom | any> {
    return this.httpClient.get(`${this.api_classroom}/find-class-room?name=${name}&schoolYear=${schoolYear}`);
  }

  //DanhNT Coding
  deleteStudentFromClass(student:IStudent[]):Observable<IStudent | any>{
    return this.httpClient.patch(this.api_classroom+"/delete",student);
  }

  //DanhNT coding
  getListStudentByClassroom(classroomId : number): Observable<IStudent[] | any>{
    return this.httpClient.get(this.api_classroom+"/get-student-classroom/"+classroomId);
  }
}
