import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {IGrade} from "../../entity/IGrade";
import {IClassroom} from "../../entity/IClassroom";
import {IScheduleDetail} from "../../entity/IScheduleDetail";
import {ISubject} from "../../entity/ISubject";
import {IScheduleSubject} from "../../entity/ischedule-subject";
import {StorageService} from "../account/storage.service";


@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailService {
  //QuanTA service new repository 31/10

  private api_url_grade = 'http://localhost:8080/api/schedules/grades';
  private api_url_classroom_exist = 'http://localhost:8080/api/schedules/classroom-exist';
  private api_url_schedule_by_id_classroom = 'http://localhost:8080/api/schedules/schedule-classroom';
  private api_url_subject = 'http://localhost:8080/api/schedules/subject';
  private api_url_update_schedule = 'http://localhost:8080/api/schedules/schedule-update';


  //QuanTA service new repository 31/10
  constructor(private httpClient: HttpClient) {
    }



  //QuanTA service new repository 31/10

  findAllGrade(): Observable<IGrade[] | any> {
    return this.httpClient.get(this.api_url_grade);
  }
  //QuanTA service new repository 31/10

  findAllClassroomExist(): Observable<IClassroom[] | any> {
    return this.httpClient.get(this.api_url_classroom_exist);
  }
  //QuanTA service new repository 31/10

  findScheduleByIdClassroom(id: number): Observable<IScheduleDetail[] | any> {
    return this.httpClient.get(this.api_url_schedule_by_id_classroom + '/' + id);
  }
  //QuanTA service new repository 31/10

  findAllSubjectList(): Observable<ISubject[] | any> {
    return this.httpClient.get(this.api_url_subject);
  }
  //QuanTA service new repository 31/10

  updateSchedule(scheduleSubject: IScheduleSubject[]): Observable<IScheduleSubject[] | any> {
    return this.httpClient.put(this.api_url_update_schedule, scheduleSubject);
  }
}
