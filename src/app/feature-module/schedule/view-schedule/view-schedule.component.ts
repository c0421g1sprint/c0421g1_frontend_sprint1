import { Component, OnInit } from '@angular/core';
import {IGrade} from "../../../entity/IGrade";
import { IClassroom } from 'src/app/entity/IClassroom';
import {IScheduleDetail} from "../../../entity/IScheduleDetail";
import {ScheduleDetailService} from "../../../core-module/schedule/schedule-detail.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
  scheduleDetails: IScheduleDetail[];
  classrooms: IClassroom[];
  chidleClassroom: IClassroom[];
  grades: IGrade[];
  classroomsId = '';
  classroomsName = '';
  gradeName = '';
  days: string[] = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  times: string[] = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];
  message: string;

  constructor(private scheduleDetailService: ScheduleDetailService) { }

  ngOnInit(): void {
    this.getAllClass();
    this.getAllGrade();
    this.searchScheduleDetail();
  }

  getAllClass() {
    this.scheduleDetailService.findAllClassroomExist().subscribe(value => {
      console.log(value);
      this.classrooms = value;
      this.chidleClassroom = value;
    });
  }

  getAllGrade() {
    this.scheduleDetailService.findAllGrade().subscribe(value => {
      console.log(value);
      this.grades = value;
    });
  }

  searchScheduleDetail() {
    this.scheduleDetailService.findScheduleByIdClassroom(+this.classroomsId).subscribe(value => {
      this.scheduleDetails = value;
      console.log(value);
      this.message = null;
      console.log(this.scheduleDetails);
      // console.log(this.scheduleDetails[0].schedule.classGrade.classroomName);
      // @ts-ignore
      this.classroomsName = this.scheduleDetails[0].schedule.classGrade.classroomName;

    }, error => {
      if(this.classroomsId === ''){
        this.message = "Vui lòng chọn lớp";
        this.classroomsName = "";
        this.scheduleDetails = null;
      }else {
        this.message = "Không có thời khoá biểu cho lớp này vui lòng chọn lớp khác";
        this.classroomsName = "";
        this.scheduleDetails = null;
      }
    });
  }

  openPDF(): void {
    const DATA = document.getElementById('dataSchedule');
    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Schedule.pdf');
    });
  }

  splitClass() {
    this.chidleClassroom = [];
    for (let i = 0; i < this.classrooms.length; i++){
      if (this.classrooms[i].grade.gradeName === this.gradeName){
        this.chidleClassroom.push(this.classrooms[i]);
      }
    }
    this.classroomsId = '';
    if (this.chidleClassroom.length === 0){
      this.chidleClassroom = this.classrooms;
    }
  }
}
