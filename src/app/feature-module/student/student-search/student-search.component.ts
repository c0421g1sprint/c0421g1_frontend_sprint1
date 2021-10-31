import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../core-module/student/student.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {

  public studentStatus = '';
  public studentName = '';
  students;
  responsePage: any;
  page = 0;
  totalPage: number;
  search = '';


  constructor(private studentService: StudentService, private  snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getSearch(0);
  }

  getSearch(pageable) {

    this.studentService.findSearch(this.studentName, this.studentStatus, pageable).subscribe(data => {
      if (data !== null) {
        this.students = data;
        this.totalPage = data.totalPages;
        console.log(this.totalPage);
        console.log(this.students);

      }else {
        console.log('no data');
        this.snackbarService.showSnackbar('Học sinh cần tìm không tồn tại', "error")
      }
    });
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
    } else {

      if (page !== -1) {
        this.getSearch(this.page);
      }
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }else {
      this.snackbarService.showSnackbar('vui lòng chọn đúng số trang', "error")
    }
    console.log(this.page);
    this.getSearch(this.page);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.snackbarService.showSnackbar('vui lòng chọn đúng số trang', "error")
      this.page = 0;
    }
    console.log(this.page);
    this.getSearch(this.page);
  }

  firstPage() {
    this.page = 0;
    this.getSearch(this.page);
  }

  lastPage() {
    if (this.page === this.totalPage - 1) {
      this.snackbarService.showSnackbar('vui lòng chọn đúng số trang', "error")
    } else {
      this.page = this.totalPage - 1;
      this.getSearch(this.page);
    }
  }

}
