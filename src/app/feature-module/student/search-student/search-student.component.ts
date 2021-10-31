import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../core-module/student/student.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {

  page = 0;
  totalPage: number;



  listStudent;
  inforStudent = '';

  constructor(private studentService: StudentService,
              private snackBar: MatSnackBar,  private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getListStudent(0);
    // console.log(this.getListStudent(0));
  }


  getListStudent(pageable) {
    this.inforStudent = '';
    this.studentService.getAllStudentBySearch(this.inforStudent, pageable).subscribe(data => {
      this.listStudent = data.content;
      this.totalPage = data.totalPages;
      console.log(this.totalPage);
      console.log(this.listStudent);
    }, error => console.log(error));
  }

  searchStudent(pageable) {
    this.inforStudent = this.inforStudent.replace('HS-', '');
    this.inforStudent = this.inforStudent.replace('HS', '');
    this.inforStudent = this.inforStudent.replace('H', '');
    this.inforStudent = this.inforStudent.replace('S-', '');
    this.inforStudent = this.inforStudent.replace('S', '');
    if (this.inforStudent== '') {
      this.getListStudent(pageable);
    }
    this.getSearchStudent(pageable);
  }

  getSearchStudent(pageable) {
    this.studentService.getAllStudentBySearch(this.inforStudent, pageable).subscribe(data => {
      if (data !== null) {
        this.listStudent = data.content;
        this.totalPage = data.totalPages;
        console.log(this.listStudent);
        this.page = 0;
      } else {
        console.log(status);
        this.snackbarService.showSnackbar("Không tìm thấy học sinh", "error");
      }
    });
  }

  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'HS-' + num;
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
    } else {
      if (page != -1) {
        // this.snackBar.open('Nhap so trang can tim', 'tim so trang');
        this.snackbarService.showSnackbar("Vui lòng nhập trang cần di chuyển đến", "error");
        this.getListStudent(this.page);
      }
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }
    console.log(this.page);
    this.getListStudent(this.page);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    this.getListStudent(this.page);
  }

  firstPage() {
    this.page = 0;
    this.getListStudent(this.page);
  }

  lastPage() {
    if (this.page == this.totalPage - 1) {
      this.snackbarService.showSnackbar("Vui lòng nhập trang hợp lệ", "error");
    } else {
      this.page = this.totalPage - 1;
      this.getListStudent(this.page);
    }
  }


}
