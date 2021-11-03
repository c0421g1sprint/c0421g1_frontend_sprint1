
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IClassroom} from "../../entity/IClassroom";
import {IStudent} from "../../entity/IStudent";
import {StorageService} from "../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
//nhớ thêm http vào url đi th nguuu
  //DanhNT coding
  private api_classroom = 'http://localhost:8080/api/classroom';

  private httpOptions;


  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'KIET ' + `${this.storageService.getToken()}`}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
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
    return this.httpClient.get(`${this.api_classroom}/find-class-room?name=${name}&schoolYear=${schoolYear}`, this.httpOptions)
  }

//HaNTT, 26/20/2021 - 11:00 AM
//create:
  //localhost:8080/api/classroom/create
  createClass(classObj: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.post(`${this.api_classroom}/create`, classObj, this.httpOptions);
  }

  //DanhNT coding
  findAllClassroom(currentPage: number): Observable<IClassroom[] | any> {
    return this.httpClient.get(this.api_classroom + '?page=' + currentPage, this.httpOptions);
  }

  //DanhNT coding
  findClassroomById(id: number): Observable<IClassroom | any> {
    return this.httpClient.get(this.api_classroom + '/get-classroom/' + id, this.httpOptions);
  }

  //DanhNT coding
  updateClass(IClassroom: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.patch(this.api_classroom + '/edit', IClassroom, this.httpOptions);
  }

  //DanhNT coding
  promoteClass(IClassroom: IClassroom): Observable<IClassroom | any> {
    return this.httpClient.put(this.api_classroom + '/promote',IClassroom, this.httpOptions);
  }

  //DanhNT coding
  findClassroomByNameAndSchoolYear(name: string, schoolYear: string): Observable<IClassroom | any> {
    return this.httpClient.get(`${this.api_classroom}/find-class-room?name=${name}&schoolYear=${schoolYear}`, this.httpOptions);
  }

  //DanhNT Coding
  deleteStudentFromClass(student: IStudent[]): Observable<IStudent | any> {
    return this.httpClient.patch(this.api_classroom + "/delete", student, this.httpOptions);
  }

  //DanhNT coding
  getListStudentByClassroom(classroomId: number): Observable<IStudent[] | any> {
    return this.httpClient.get(this.api_classroom + "/get-student-classroom/" + classroomId, this.httpOptions);
  }
}
