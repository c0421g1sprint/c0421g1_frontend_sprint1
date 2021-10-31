import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStudent} from '../../entity/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private api_url_student = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {
  }

//LamNT create
  create(newStudent: IStudent): Observable<IStudent | any> {
    return this.http.post(this.api_url_student + '/add', newStudent);
  }

  // LamNT edit
  edit(id: number, editStudent: IStudent): Observable<IStudent | any> {
    return this.http.patch(this.api_url_student + '/edit', editStudent);
  }

  //LamNT find by id
  findById(id: number): Observable<IStudent | any> {
    return this.http.get(this.api_url_student + '/find-student/' + id);
  }

  //HaNTT, 26/20/2021 - 11:00 AM (list student chưa có lớp)
  getStudentWhereClassIdNull(): Observable<IStudent[] | any> {
    return this.http.get(`${this.api_url_student}/find-student`)
  }



}
