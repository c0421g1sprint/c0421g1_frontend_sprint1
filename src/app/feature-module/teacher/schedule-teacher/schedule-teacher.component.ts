import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {ScheduleTeacherService} from "../../../core-module/teacher/scheduleTeacher/schedule-teacher.service";
import {IScheduleDetail} from "../../../entity/IScheduleDetail";

@Component({
  selector: 'app-schedule-teacher',
  templateUrl: './schedule-teacher.component.html',
  styleUrls: ['./schedule-teacher.component.css']
})
export class ScheduleTeacherComponent implements OnInit {

  scheduleDetails: IScheduleDetail[];
  message: string;


  times = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'];
  days =  ['Tiết 1','Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];
  constructor(private scheduleDetailService: ScheduleTeacherService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.listScheduleDetail();
  }

  listScheduleDetail() {
    this.scheduleDetailService.getScheduleDetail(1).subscribe(value => {
      this.scheduleDetails = value;
      console.log(value);
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
