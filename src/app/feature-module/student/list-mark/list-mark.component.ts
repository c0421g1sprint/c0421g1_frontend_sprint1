import {Component, OnInit} from '@angular/core';
import {IMark} from "../../../entity/IMark";
import {ISubject} from "../../../entity/ISubject";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

​
import {MatDialog} from "@angular/material/dialog";
import {MarkEditComponent} from "../mark-edit/mark-edit.component";
import {MarkService} from "../../../core-module/student/mark.service";
import {ScheduleDetailService} from "../../../core-module/schedule/schedule-detail.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {IClassroom} from "../../../entity/IClassroom";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";

​
@Component({
  selector: 'app-list-mark',
  templateUrl: './list-mark.component.html',
  styleUrls: ['./list-mark.component.css']
})
export class ListMarkComponent implements OnInit {
​
  //MinhNN update 02/11
  currentPage: number | any = 0;
  totalPage: number;
  nameStudent: String | any = '';
  nameClass: String | any = '';
  idSubject: number | any = '';
  marks: IMark[];
  subject: ISubject[];
  classRoom: IClassroom[];
  searchAll: any;
  nameStudentOld: string = "";
  idSubjectOld: number = 0;

  constructor(private markService: MarkService, private scheduleDetailService: ScheduleDetailService,
              private classroomService: ClassroomService,
              private formBuilder: FormBuilder, private route: Router,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) {
    this.search();
  }

  ngOnInit(): void {
  ​
      this.scheduleDetailService.findAllSubjectList().subscribe(data => {
        this.subject = data;
      })
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
    }
    this.search();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.search();
  }

  getName($event: any) {
    this.nameStudent = $event.target.value;
    console.log('student name = ' + this.nameStudent)
  }

  getIdSubject($event: Event | any) {
    this.idSubject = $event.target.value;
    console.log('idSubject = ' + this.idSubject)
  }

  forwardTo(inputPage: number) {
    if (Number(inputPage) <= this.totalPage && Number(inputPage) > 0) {
      this.currentPage = inputPage - 1;
      this.search();
    } else {
      this.currentPage = 0;
      this.snackbarService.showSnackbar("Trang bạn nhập vào không có", "error");
    }
  }

  search() {
    if (this.idSubject == 0 && (this.nameStudent == "" || this.nameStudent != "")) {
      this.markService.getAll(this.currentPage).subscribe(list => {
        this.searchAll = list;
        this.marks = this.searchAll.content;
        // this.totalPage = this.searchAll['totalPage'];
        this.totalPage = this.searchAll.totalPages;
      })
    }
    if ((this.nameStudent || this.idSubject) != '') {
      if (!(this.nameStudent == this.nameStudentOld && this.idSubject == this.idSubjectOld)) {
        this.currentPage = 0;
        this.nameStudentOld = this.nameStudent;
        this.idSubjectOld = this.idSubject;
      }
    }
    this.markService.searchMark(this.currentPage, this.nameStudent, this.idSubject, this.nameClass).subscribe(list => {
        this.searchAll = list;
        console.log(list)
        this.marks = this.searchAll.content;
        // this.totalPage = list['totalPage'];
        this.totalPage = this.searchAll.totalPages;
      }, error => {
        this.snackbarService.showSnackbar("Không tìm thấy dữ liệu", 'error');
      }
    )
  }

  openDialog(mark: IMark) {
    let dialog = this.dialog.open(MarkEditComponent, {
      width: "455px",
      data: {
        obj: mark
      }
    });
    dialog.afterClosed().subscribe(next => {
      if (next == 'true') {
        this.ngOnInit();
      }
    })
  }
}
