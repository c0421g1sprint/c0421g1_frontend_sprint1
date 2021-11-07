import {Component, OnInit} from "@angular/core";
import {IScheduleTeacher} from "../../../entity/ischedule-teacher";
import {ScheduleTeacherService} from "../../../core-module/teacher/scheduleTeacher/schedule-teacher.service";
import {StorageService} from "../../../core-module/account/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-teacher',
  templateUrl: './schedule-teacher.component.html',
  styleUrls: ['./schedule-teacher.component.css']
})
export class ScheduleTeacherComponent implements OnInit {
  scheduleDetails: IScheduleTeacher[];
  message: string;
  nameClass: string ='';

  days = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  times =  ['Tiết 1','Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];
  constructor(private scheduleDetailService: ScheduleTeacherService,
              private router: Router,
              private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.listScheduleDetail();
  }

  listScheduleDetail() {
    this.scheduleDetailService.getScheduleDetail(this.storageService.getUsernameFromSession()).subscribe(value => {
        this.scheduleDetails = value;
        console.log(this.scheduleDetails[0]);
        this.nameClass = value[0].classroomName;
      }
      ,
      error => {
        if( error.status == "404"){
          this.message='No data found ';
        }else {
          this.message='No data found';
        }
      });
  }
}
