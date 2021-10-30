import { Component, OnInit } from '@angular/core';
import {SearchTeacherService} from "../../../core-module/teacher/search-teacher.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {

  page = 0;
  totalPage: number;



  listTeacher;
  search = '';

  constructor(private teacherService: SearchTeacherService, private toastrService: ToastrService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getListTeacher(0);
    console.log(this.getListTeacher(0));
  }


  getListTeacher(pageable) {
    this.search = '';
    this.teacherService.getAllTeacherBySearch(this.search, pageable).subscribe(data => {
      this.listTeacher = data.content;
      this.totalPage = data.totalPages;
      console.log(this.totalPage);
      console.log(this.listTeacher);
    }, error => console.log(error));
  }

  searchTeacher(pageable) {
    this.search = this.search.replace('GV-', '');
    this.search = this.search.replace('GV', '');
    this.search = this.search.replace('G', '');
    this.search = this.search.replace('V-', '');
    this.search = this.search.replace('V', '');
    if (this.search === '') {
      this.getListTeacher(pageable);
    }
    this.getSearchTeacher(pageable);
  }

  getSearchTeacher(pageable) {
    this.teacherService.getAllTeacherBySearch(this.search, pageable).subscribe(data => {
      if (data == null) {
        this.toastrService.warning('Thông tin bạn tìm kiếm hiện không có trong hệ thống ', 'Thông báo !');
        this.getListTeacher(this.search);
      } else {
        this.listTeacher = data.content;
        console.log(this.listTeacher);
        this.page = 0;
      }
    });
  }

  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'GV-' + num;
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
    } else {
      if (page != -1) {
        this.toastrService.warning('Request to enter the number of pages in the list', 'massage search page');
        this.getListTeacher(this.page);
      }
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }
    console.log(this.page);
    this.getListTeacher(this.page);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    this.getListTeacher(this.page);
  }

  firstPage() {
    this.page = 0;
    this.getListTeacher(this.page);
  }

  lastPage() {
    if (this.page == this.totalPage - 1) {
      this.toastrService.info('You are on the last page', 'message last page');
    } else {
      this.page = this.totalPage - 1;
      this.getListTeacher(this.page);
    }
  }


}
