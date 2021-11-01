import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  search = '';
  indexPagination: number = 0;             //vị trí trang hiện tại
  sizePagination: number = 3;              //số record trong mỗi trang
  totalPagination: number;                 //tổng số trang
  @ViewChild('presentPage') pageInput: ElementRef;     //trang nhập vào để di chuyển tới đó

  constructor(private studentService: StudentService, private  snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch() {
    this.studentName=this.studentName.trim()
    if (this.studentName!=null&&this.studentName!=""){
      this.indexPagination=0;
    }
    this.studentService.findSearch(this.studentName, this.studentStatus, this.indexPagination,
      this.sizePagination).subscribe(data => {
      this.students = data;
      this.totalPagination = data.totalPages;
      console.log(data)
    },error => {
        console.log('no data');
        this.snackbarService.showSnackbar('Học sinh cần tìm không tồn tại', "error")
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination - 1) {
      this.indexPagination = this.totalPagination - 1;
    }
    this.getSearch();
  }

   // trang trước
  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
    }
    this.getSearch();
  }

  // DungNM - di chuyển tới trang được nhập vào
  findPagination(value: string) {
    if (value == ""){
      this.snackbarService.showSnackbar("Vui lòng nhập trang cần di chuyển đến", "error");
      return;
    }
    let index = Number.parseInt(value) - 1;

    if (isNaN(index) || index >= this.totalPagination || index < 0) {
      this.snackbarService.showSnackbar("Vui lòng nhập trang hợp lệ", "error");
    } else {
      this.indexPagination = index;
    }
    this.getSearch();
    this.pageInput.nativeElement.value = null;
  }

}
