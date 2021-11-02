import { Component, OnInit } from '@angular/core';
import {SearchTeacherService} from "../../../core-module/teacher/search-teacher.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


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
  formSearch: FormGroup;

  constructor(private teacherService: SearchTeacherService,  private snackbarService: SnackbarService) {
    this.formSearch = new FormGroup(
      {searchInput: new FormControl('', Validators.maxLength(20))}
    )
  }

  validMsg = {
    searchInput: [
      {type: 'maxlength', message: 'Nội dung tìm kiếm quá dài.'}
    ]
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
    // this.teacherService.getAllTeacherBySearch(this.search, pageable).subscribe(data => {
    //   if (data == null) {
    //     this.snackbarService.showSnackbar("Không tìm thấy giáo viên cần tìm", "error");
    //     this.getListTeacher(this.search);
    //   } else {
    //     this.listTeacher = data.content;
    //     console.log(this.listTeacher);
    //     this.page = 0;
    //   }
    // });
    this.teacherService.getAllTeacherBySearch(this.search, pageable).subscribe(data => {
        this.listTeacher = data.content;
        this.totalPage = data.totalPages;
        console.log(this.listTeacher);
        this.page = 0;
      },
      error => {
      console.log("error " + error + " etgsdgsfgdgdsg" );
        this.snackbarService.showSnackbar("Không tìm thấy giáo viên cần tìm", "error");
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
        this.snackbarService.showSnackbar("Vui lòng nhập trang cần di chuyển đến", "error");
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
      this.snackbarService.showSnackbar("Vui lòng nhập trang hợp lệ", "error");
    } else {
      this.page = this.totalPage - 1;
      this.getListTeacher(this.page);
    }
  }


}
