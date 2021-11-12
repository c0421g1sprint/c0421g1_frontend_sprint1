import {Component, OnInit} from '@angular/core';
import {IMark} from "../../../entity/IMark";
import {ISubject} from "../../../entity/ISubject";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  currentPage: number = 0;
  totalPage: number;
  marks: IMark[];
  subject: ISubject[];
  classRoom: IClassroom[];
  flagSearch: number = 0;
​
  searchForm: FormGroup = new FormGroup({
    nameStudent: new FormControl(""),
    subjectId: new FormControl(""),
    classId: new FormControl(""),
  })
​
  constructor(private markService: MarkService, private scheduleDetailService: ScheduleDetailService,
              private classroomService: ClassroomService,
              private formBuilder: FormBuilder, private route: Router,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) {
  }
​
  ngOnInit(): void {
    this.scheduleDetailService.findAllClassroomExist().subscribe(list => {
      this.classRoom = list;
      this.scheduleDetailService.findAllSubjectList().subscribe(data => {
        this.subject = data;
        this.searchAll(this.currentPage);
      })
    })
  }
​
  getAllMark(page: number) {
    this.markService.getAll(page).subscribe(data => {
      this.marks = data.content;
      console.log(this.marks)
      this.totalPage = data.totalPages;
    });
  }
​
  searchAll(page: number) {
    // console.log(this.searchForm.value)
    if (this.searchForm.value.nameStudent == "" && this.searchForm.value.subjectId == 0 &&
      this.searchForm.value.classId == 0) {
      this.getAllMark(page);
    } else {
      this.flagSearch = 1;
      this.markService.searchMark(page, this.searchForm.value.nameStudent, this.searchForm.value.subjectId,
        this.searchForm.value.classId).subscribe(data => {
        this.marks = data.content;
        this.totalPage = data.totalPages;
        console.log(this.totalPage)
        console.log(data)
      }, error => {
        this.snackbarService.showSnackbar("Không có dữ liệu", "error");
        this.flagSearch = 0;
      })
    }
  }
​
  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
    }
    this.searchAll(this.currentPage);
  }
​
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    } else {
      this.currentPage = 0;
    }
    this.searchAll(this.currentPage);
  }
​
  setPage() {
    if (this.flagSearch == 1) {
      this.currentPage = 0;
    }
  }
​
  toPage(page: number) {
    if (page < this.totalPage && page > 0) {
      this.currentPage = page - 1;
    } else {
      this.currentPage = 0;
      this.snackbarService.showSnackbar("Trang bạn nhập vào không có", "error");
    }
    this.searchAll(this.currentPage);
  }
​
  openDialog(mark: IMark) {
    let dialog = this.dialog.open(MarkEditComponent, {
      width: "455px",
      data: {
        obj: mark
      }
    });
    dialog.afterClosed().subscribe(next => {
      if (next == 'true') {
        this.ngOnInit()
      }
    })
  }
​
}
