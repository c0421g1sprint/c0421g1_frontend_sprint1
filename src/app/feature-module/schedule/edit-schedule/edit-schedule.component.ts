import {Component, OnInit} from '@angular/core';
import {IScheduleSubject} from "../../../entity/ischedule-subject";
import {ISubject} from "../../../entity/ISubject";
import {IClassroom} from "../../../entity/IClassroom";
import {IScheduleDetail} from "../../../entity/IScheduleDetail";
import {IGrade} from "../../../entity/IGrade";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ScheduleDetailService} from "../../../core-module/schedule/schedule-detail.service";
import {HttpHeaders} from "@angular/common/http";
import {DialogScheduleComponent} from "../dialog-schedule/dialog-schedule.component";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  scheduleDetail: IScheduleDetail[];
  grade: IGrade[];
  idClass: number;
  classroomExists: IClassroom[];
  day: string[] = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  time: string[] = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];
  subjectList: ISubject[];
  httpOptions: any;
  scheduleSubject: Array<IScheduleSubject> = new Array();
  errorMessage = '';

  constructor(private scheduleService: ScheduleDetailService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: SnackbarService,
              private dialog: MatDialog) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  //QuanTA service new repository 31/10

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idClass = Number(paramMap.get('id'));
      this.getSubject();
    });

  }

  //QuanTA service new repository 31/10

  getGrade() {
    return this.scheduleService.findAllGrade().subscribe(list => {
      console.log(list);
      this.grade = list;
      this.getClassroomExist();
    });
  }

  //QuanTA service new repository 31/10

  getClassroomExist() {
    return this.scheduleService.findAllClassroomExist().subscribe(list => {
      console.log(list);
      this.classroomExists = list;
      this.getGrade();
    });
  }

  //QuanTA service new repository 31/10

  getSubject() {
    return this.scheduleService.findAllSubjectList().subscribe(list => {
      console.log(list);
      this.subjectList = list;
      this.getClassroomExistById();
    });
  }

  //QuanTA service new repository 31/10

  getClassroomExistById() {
    return this.scheduleService.findScheduleByIdClassroom(this.idClass).subscribe(list => {
      console.log(list);
      this.scheduleDetail = list;
    }, error => {
      if (error.status == '406'){
        this.errorMessage = 'Hiện không có thời khóa biểu của lớp này'
      }
    });
  }

  //QuanTA service new repository 31/10

  updateSchedule(subjectId, scheduleDetailId: number) {
    let subjectIdNumber: number = +subjectId.target.value;
    console.log(subjectIdNumber);
    console.log(scheduleDetailId);
    let a = new IScheduleSubject(subjectIdNumber, scheduleDetailId);
    console.log(a);
    this.scheduleSubject.push(a);
    console.log(this.scheduleSubject);
  }


  openDialog() {
    let dialogRef = this.dialog.open(DialogScheduleComponent, {
      width: '400px'
    }); 
    dialogRef.afterClosed().subscribe(next => {
      console.log(next);
      if (next == 'true') {
        this.scheduleService.updateSchedule(this.scheduleSubject).subscribe(next => {
          this.snackBar.showSnackbar('Cập nhật thời khóa biểu thành công','success');
        });
      }
    },error => {
      this.snackBar.showSnackbar('Cập nhật thời khóa biểu thất bại','error')
    });
  }


}
