import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IStudent} from "../../../entity/IStudent";
import {IClassroom} from "../../../entity/IClassroom";
import {IGrade} from "../../../entity/IGrade";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {StudentService} from "../../../core-module/student/student.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentListToShow: IStudent[] = [];    //danh sách học sinh lấy theo lớp từ DB
  classroomList: IClassroom[] = [];      //danh sách toàn bộ lớp trong DB
  yearSchoolList: string[] = [];         //danh sách các năm học của các lớp
  gradeList: IGrade[] = [];              //danh sách toàn bộ khối
  classroomSelect: IClassroom[] = [];    //danh sách lớp dropdown khi chọn năm + khối
  classroomToShow: IClassroom | undefined; //lớp đã chọn để show
  indexPagination: number = 0;             //vị trí trang hiện tại
  sizePagination: number = 8;              //số record trong mỗi trang
  totalPagination: number;                 //tổng số trang
  @ViewChild('presentPage') pageInput: ElementRef;     //trang nhập vào để di chuyển tới đó

  studentListForm: FormGroup = new FormGroup({
    year: new FormControl(),
    grade: new FormControl(),
    classroom: new FormControl()
  });

  constructor(private studentService: StudentService,
              private dialog: MatDialog,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.studentService.getAllClassroom().subscribe(next => {
      this.classroomList = next;
      for (let value of this.classroomList) {
        if (!this.yearSchoolList.includes(value.classroomSchoolYear) && value.classroomSchoolYear != null
          && value.classroomSchoolYear != "") {
          this.yearSchoolList.push(value.classroomSchoolYear)
        }
      }
      this.yearSchoolList = this.yearSchoolList.sort();
    }, error => {
      console.log(status);
      this.snackbarService.showSnackbar("Không tìm thấy dữ liệu lớp", "error");
    });

    this.studentService.getAllGrade().subscribe(next => {
      this.gradeList = next;
    }, error => {
      this.snackbarService.showSnackbar("Không tìm thấy dữ liệu khối", "error");

    })
  }

  //DungNM - lấy danh sách học sinh theo lớp
  getStudentsByClassroom() {
    let classroom = this.studentListForm.value.classroom;
    if (classroom == "null" || classroom == null) {
      this.classroomToShow = null;
      this.snackbarService.showSnackbar("Vui lòng chọn lớp", "error");
      return;
    }
    this.studentService.getStudentsByClassroomId(classroom.classroomId, this.indexPagination, this.sizePagination).subscribe(next => {
      this.studentListToShow = next.content;
      this.classroomToShow = classroom;
      this.totalPagination = next.totalPages;
    }, error => {
      this.studentListForm.controls.classroom.reset(this.classroomToShow);
      this.snackbarService.showSnackbar("Danh sách lớp rỗng", "error")
    })
  }

  //DungNM - lấy danh sách lớp dựa theo năm học và khối đã chọn
  getClassroomByGrade() {
    let year = this.studentListForm.value.year;
    let grade = this.studentListForm.value.grade;
    if (year == null || grade == null) {
      return;
    }
    this.classroomSelect = this.classroomList.filter(value => {
      return value.grade.gradeId == grade && value.classroomSchoolYear == year;
    })
  }

  //DungNM - trang kế tiếp
  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination - 1) {
      this.indexPagination = this.totalPagination - 1;
    }
    this.getStudentsByClassroom();
  }

  //DungNM - trang trước
  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
    }
    this.getStudentsByClassroom();
  }

  //DungNM - di chuyển tới trang được nhập vào
  findPagination(value: string) {
    let index = Number.parseInt(value) - 1;

    if (isNaN(index) || index >= this.totalPagination || index < 0) {
      this.snackbarService.showSnackbar("Số trang không hợp lệ", "error");
    } else {
      this.indexPagination = index;
    }
    this.getStudentsByClassroom();
    this.pageInput.nativeElement.value = null;
  }

  //DungNM - xoá học sinh theo id
  deleteStudent(studentId: number, name: string) {
    let dialogRef =this.dialog.open(DialogDeleteComponent, {
      data: {
        id: studentId,
        name: name,
        object: "học sinh"
      },
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(next => {
      if (next == 'yes') {
        this.studentService.deleteStudentById(studentId).subscribe(next => {
          this.getStudentsByClassroom();
          this.snackbarService.showSnackbar("Xoá " + name + " thành công", "success");
        }, error => {
          this.snackbarService.showSnackbar("Xoá " + name + " thất bại", "error");
        })
      }
    });
  }
}
