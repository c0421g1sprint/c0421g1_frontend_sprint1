import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IStudent} from "../../../entity/IStudent";
import {IClassroom} from "../../../entity/IClassroom";
import {IGrade} from "../../../entity/IGrade";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {StudentService} from "../../../core-module/student/student.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {StudentCreateComponent} from "../student-create/student-create.component";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";

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
  @ViewChild('buttonChoose') buttonChoose: ElementRef;     //button chọn để tìm danh sách

  studentListForm: FormGroup = new FormGroup({
    year: new FormControl(),
    grade: new FormControl(),
    classroom: new FormControl()
  });

  constructor(private studentService: StudentService,
              private classroomService: ClassroomService,
              private dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    let idClassroom = Number.parseInt(this.activatedRoute.snapshot.paramMap.get("idClassroom"));
    console.log("idclass " + idClassroom)
    if (idClassroom != null || !Number.isNaN(idClassroom)) {
      this.classroomService.findClassroomById(idClassroom).subscribe(n1 => {
        this.classroomToShow = n1;
        this.studentService.getStudentsByClassroomId(idClassroom, this.indexPagination, this.sizePagination).subscribe(n2 => {
          this.studentListToShow = n2.content;
          return;
        })
      });
    }
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
    if (this.studentListForm.value.year == "null" || this.studentListForm.value.year == null) {
      this.snackbarService.showSnackbar("Vui lòng chọn năm học", "error");
      return;
    }
    if (this.studentListForm.value.grade == "null" || this.studentListForm.value.grade == null) {
      this.snackbarService.showSnackbar("Vui lòng chọn khối", "error");
      return;
    }
    let classroom = this.studentListForm.value.classroom;
    if (classroom == "null" || classroom == null) {
      this.classroomToShow = null;
      this.snackbarService.showSnackbar("Vui lòng chọn lớp", "error");
      return;
    }
    for (let value of this.classroomList) {
      if (value.classroomId == classroom.classroomId) {
        this.studentService.getStudentsByClassroomId(classroom.classroomId, this.indexPagination, this.sizePagination).subscribe(next => {
          this.studentListToShow = next.content;
          this.classroomToShow = classroom;
          this.totalPagination = next.totalPages;
        }, error => {
          this.studentListForm.controls.classroom.reset(this.classroomToShow);
          this.snackbarService.showSnackbar("Danh sách lớp rỗng", "error")
        })
        return;
      }
    }
    this.snackbarService.showSnackbar("Dữ liệu đầu vào không hợp lệ", "error");
  }

  //DungNM - lấy danh sách lớp dựa theo năm học và khối đã chọn
  getClassroomByGrade() {
    let year = this.studentListForm.value.year;
    let grade = this.studentListForm.value.grade;
    if (year == null || grade == null) {
      this.classroomSelect = [];
      return;
    }
    this.classroomSelect = this.classroomList.filter(value => {
      return value.grade.gradeId == grade && value.classroomSchoolYear == year;
    })
  }

  toggleButtonChoose() {
    if (this.studentListForm.value.classroom != "null") {
      this.buttonChoose.nativeElement.disabled = false;
      return;
    }
    this.buttonChoose.nativeElement.disabled = true;
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
    if (value == "") {
      this.snackbarService.showSnackbar("Vui lòng nhập trang cần di chuyển đến", "error");
      return;
    }
    let index = Number.parseInt(value) - 1;

    if (isNaN(index) || index >= this.totalPagination || index < 0) {
      this.snackbarService.showSnackbar("Vui lòng nhập trang hợp lệ", "error");
    } else {
      this.indexPagination = index;
    }
    this.getStudentsByClassroom();
    this.pageInput.nativeElement.value = null;
  }

  //DungNM - xoá học sinh theo id
  deleteStudent(studentId: number, name: string) {
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        id: studentId,
        name: name,
        object: "học sinh"
      },
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(next => {
      if (next == 'yes') {
        let arrId: number[] = [];
        for (let student of this.studentListToShow) {
          arrId.push(student.studentId);
        }
        if (!arrId.includes(studentId)) {
          this.snackbarService.showSnackbar("Không tìm thấy học sinh", "error");
          return;
        }
        this.studentService.deleteStudentById(studentId).subscribe(next => {
          this.getStudentsByClassroom();
          this.snackbarService.showSnackbar("Xoá " + name + " thành công", "success");
        }, error => {
          if (error.status == 404) {
            this.snackbarService.showSnackbar("Không tồn tại dữ liệu học sinh", "error");
            return;
          }
          if (error.status == 0) {
            this.snackbarService.showSnackbar("Lỗi hệ thống. Vui lòng thử lại", "error");
            return;
          }
        })
      }
    });
  }

  detailStudent(studentId: number) {
    for (let student of this.studentListToShow) {
      if (student.studentId == studentId) {
        // this.router.navigateByUrl("students/detail/" + studentId);
        this.router.navigate(['students/detail/' + studentId,
          {"idClassroom": this.classroomToShow.classroomId}]);
        return;
      }
    }
    this.snackbarService.showSnackbar("Không tìm thấy học sinh", "error");
  }

  editStudent(studentId: number) {
    for (let student of this.studentListToShow) {
      if (student.studentId == studentId) {
        this.router.navigateByUrl("students/edit/" + studentId);
        return;
      }
    }
    this.snackbarService.showSnackbar("Không tìm thấy học sinh", "error");
  }

  //LamNT Open dialog create student
  openDialogCreate() {
    let dialogCreate = this.dialog.open(StudentCreateComponent, {width: '1100px', autoFocus: false, maxHeight: '90vh'});

  }
}
