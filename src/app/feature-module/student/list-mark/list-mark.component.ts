import { Component, OnInit } from '@angular/core';
import {IMark} from "../../../entity/IMark";
import {ISubject} from "../../../entity/ISubject";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MarkEditComponent} from "../mark-edit/mark-edit.component";
import {MarkService} from "../../../core-module/student/mark.service";
import {ScheduleDetailService} from "../../../core-module/schedule/schedule-detail.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-list-mark',
  templateUrl: './list-mark.component.html',
  styleUrls: ['./list-mark.component.css']
})
export class ListMarkComponent implements OnInit {

  //MinhNN update 02/11
  currentPage: number = 0;
  totalPage: number;
  nameStudent: String | any = '';
  idSubject: number | any = '';
  className: String | any = '';
  marks: IMark[];
  subject: ISubject[];
  searchAll: any;
  constructor(private markService: MarkService, private scheduleDetailService: ScheduleDetailService,
              private formBuilder: FormBuilder, private route: Router,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAllMark(this.currentPage)
    this.scheduleDetailService.findAllSubjectList().subscribe(data => {
      this.subject = data;
    })
  }
  getAllMark(page: number) {
    this.markService.getAll(page).subscribe(next => {
      this.marks = next.content;
      console.log(next);
      this.totalPage = next.totalPages;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.getAllMark(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllMark(this.currentPage);
    }
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
      this.getAllMark(this.currentPage);
    } else {
      this.currentPage = 0;
      this.snackbarService.showSnackbar("Trang bạn nhập vào không có","error");
    }
  }

  search() {

    this.markService.searchMark(this.currentPage, this.nameStudent, this.className, this.idSubject).subscribe(list => {
      this.searchAll = list;
      console.log(list)
      // this.currentPage = 0;
      this.marks = list['content'];
      this.totalPage = list['totalPage'];

    })
  }

  openDialog(mark: IMark) {
    let dialog = this.dialog.open(MarkEditComponent, {
      width: "500px",
      data: {
        obj: mark
      }
    });
    dialog.afterClosed().subscribe( next => {
      if (next == 'true'){
        this.ngOnInit();
      }
    })
  }
}
