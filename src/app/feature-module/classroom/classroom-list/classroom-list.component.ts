import { Component, OnInit } from '@angular/core';
import {IClassroom} from "../../../entity/IClassroom";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  //DanhNT coding
  classList: IClassroom[];

  //DanhNT coding
  currentPage: number = 0;
  totalPage: number = 0;

  //DanhNT coding
  classroom: IClassroom;

  constructor(private classroomService: ClassroomService,
              private snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    //DanhNT coding
    this.getClassList(this.currentPage);
  }

  //DanhNT coding get list class
  getClassList(page: number) {
    this.classroomService.findAllClassroom(page).subscribe(list => {
      this.classList = list.content;
      this.totalPage = list.totalPages;
    });
  }

  //DanhNT coding pagination
  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.getClassList(this.currentPage);
    }
  }

  //DanhNT coding pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getClassList(this.currentPage);
    }
  }

  //DanhNT coding pagination
  forwardTo(inputPage: number) {
    if (Number(inputPage) <= this.totalPage && Number(inputPage) > 0) {
      this.currentPage = inputPage - 1;
      this.getClassList(this.currentPage);
    } else {
      this.currentPage = 0;
      this.snackBar.showSnackbar("Trang bạn nhập vào không có","error");
    }
  }


  doPromote(classroom: IClassroom) {
    this.classroomService.promoteClass(classroom).subscribe(next => {
      // this.openSnackBar("Đã lên lớp thành công");
      this.snackBar.showSnackbar("Đã lên lớp thành công","success");
      this.ngOnInit();
    });
  }


  promote(classroomId: number) {
    this.classroomService.findClassroomById(classroomId).subscribe(obj => {
      this.doPromote(obj);
    });
  }
}
