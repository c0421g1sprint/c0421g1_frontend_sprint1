import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {IDivision} from "../../../entity/IDivision";
import {DivisionService} from "../../../core-module/teacher/division.service";


@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {

  page = 0;
  totalPage: number;
  divisionList: IDivision [];
  division: number | any = ''; //tạo biến tìm kiếm theo phòng ban
  pageObj: any = {page: 0, size: 10} //khởi tạo 1 trang bao gồm thuộc tính : trang hiện tại, số phần tử/trang


  listTeacher;
  search = '';
  formSearch: FormGroup;
  pageNumberInput: any;
  oldName: string = "";
  oldDivisionId: number = -1;


  constructor(private teacherService: TeacherService, private snackbarService: SnackbarService,
              private divisionService: DivisionService) {
    this.formSearch = new FormGroup(
      {searchInput: new FormControl('', Validators.maxLength(20))}
    )
  }

  validMsg = {
    searchInput: [
      {type: 'maxlength', message: 'Nội dung tìm kiếm quá dài.'}
    ]
  }

  getAllDivision() {
    this.divisionService.findAll().subscribe(division => {
      this.divisionList = division;
      console.log(this.divisionList);
    })
  }

  ngOnInit(): void {
    this.getAllDivision();
    this.getListTeacher(0);
    console.log(this.getListTeacher(0));
  }


  getListTeacher(pageable) {
    if ((this.search || this.division) != "") {  //fix lỗi: đứng ở trang 2,3..: không tìm được infor object trang 0/1 --> khi tìm kiếm --> cho về page = 0
      if (!(this.search == this.oldName && this.division == this.oldDivisionId)) {
        this.pageObj.page = 0;
        this.oldName = this.search;
        this.oldDivisionId = this.division;
      }
    }
    this.search = this.search.trim(); //bỏ ký tự trắng ở đầu khi nhập keyword tìm kiếm
    this.teacherService.getAllTeacherBySearch(this.search, this.division, pageable).subscribe(data => {
      this.listTeacher = data.content;
      this.totalPage = data.totalPages;
      console.log(this.totalPage);
      console.log(this.listTeacher);
    }, error => console.log(error));
  }

  getDivision($event: any) {
    this.division = $event.target.value;
    console.log(this.division)
  }


  searchTeacher(pageable) {
    this.search = this.search.replace('GV-', '');
    this.search = this.search.replace('GV', '');
    this.search = this.search.replace('G', '');
    this.search = this.search.replace('V-', '');
    this.search = this.search.replace('V', '');
    if (this.search == '') {
      this.getListTeacher(pageable);
    }
    this.getSearchTeacher(pageable);
  }

  getSearchTeacher(pageable) {

    this.teacherService.getAllTeacherBySearch(this.search, this.division, pageable).subscribe(data => {
        this.listTeacher = data.content;
        this.totalPage = data.totalPages;
        console.log(this.listTeacher);
        this.page = 0;
      },
      error => {
        console.log("error " + error + " etgsdgsfgdgdsg");
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
      this.pageObj['page']++;

    }
    console.log(this.page);
    this.getListTeacher(this.page);
    this.pageNumberInput = this.page +1;
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    this.getListTeacher(this.page);
    this.pageNumberInput = this.page +1;
  }

  // firstPage() {
  //   this.page = 0;
  //   this.getListTeacher(this.page);
  //   this.pageNumberInput = this.page +1;
  // }
  //
  // lastPage() {
  //   if (this.page == this.totalPage - 1) {
  //     this.snackbarService.showSnackbar("Bạn đã ở trang cuối cùng của danh sách", "error");
  //   } else {
  //     this.page = this.totalPage - 1;
  //     this.getListTeacher(this.page);
  //     this.pageNumberInput = this.page +1;
  //   }
  // }

  searchPage() {
    if (this.pageNumberInput - 1 < this.totalPage && this.pageNumberInput - 1 >= 0) {
      this.page = this.pageNumberInput - 1;
    } else {
      this.snackbarService.showSnackbar('Nhập sai số!', 'error');
    }
    this.getListTeacher(this.pageNumberInput)
  }
}
