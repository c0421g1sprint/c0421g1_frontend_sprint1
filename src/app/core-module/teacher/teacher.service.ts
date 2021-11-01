import {Injectable} from "@angular/core";
import {ITeacher} from "../../../entity/ITeacher";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


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
    return this.http.patch(this.url + "/updateInFor", iTeacher);
  }

  // findByAccountNameTeacher(name: String | any): Observable<ITeacher | any> {
  //   return this.http.get(this.url + '/' + name);
  // }

}
