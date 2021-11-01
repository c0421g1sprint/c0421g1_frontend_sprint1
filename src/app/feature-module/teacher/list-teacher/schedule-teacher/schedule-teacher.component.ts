import { Component, OnInit } from '@angular/core';
import {IScheduleDetail} from "../../../../../entity/IScheduleDetail";
import {Router} from "@angular/router";
import {ScheduleTeacherService} from "../../../../core-module/teacher/scheduleTeacher/schedule-teacher.service";

@Component({
  selector: 'app-schedule-teacher',
  templateUrl: './schedule-teacher.component.html',
  styleUrls: ['./schedule-teacher.component.css']
})
export class ScheduleTeacherComponent implements OnInit {

  scheduleDetails: IScheduleDetail[];
  message: string;

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
    console.log(this.scheduleDetails);
  }

}
