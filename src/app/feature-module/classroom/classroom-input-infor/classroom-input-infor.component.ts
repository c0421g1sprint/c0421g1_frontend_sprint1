import {Component, OnInit} from '@angular/core';
import {ITeacher} from "../../../entity/ITeacher";
import {IStudent} from "../../../entity/IStudent";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {StudentService} from "../../../core-module/student/student.service";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogConfirmCreateComponent} from "../dialog-confirm-create/dialog-confirm-create.component";
import {SnackbarComponent} from "../../../share-module/snackbar/snackbar.component";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {StudentCreateComponent} from "../../student/student-create/student-create.component";
import {DialogStudentListComponent} from "../dialog-student-list/dialog-student-list.component";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-classroom-input-infor',
  templateUrl: './classroom-input-infor.component.html',
  styleUrls: ['./classroom-input-infor.component.css']
})
export class ClassroomInputInforComponent implements OnInit {

  className: string | any = '';
  schoolYear: string = (new Date().getFullYear()).toString(); //mặc định: năm hiện tại
  teacherListClassIdNull: ITeacher[] = [];  //select-option
  studentListClassIdNull: IStudent[] = [];  //check box
  //list học sinh tạm
  studentListSelected: IStudent[] = [];
  teacherSelected: ITeacher; // teacher da duoc chon lam giao vien chu nhiem 1 lop

  //phân trang (fe)
  page: number = 1;
  //teacherId
  idTeacher: number;

  goToPage(inputPage: number, totalPage: number) {
    console.log("tổng trang: ");
    console.log(inputPage);
    console.log(typeof inputPage);
    console.log(totalPage)
    if (inputPage < 1 || inputPage > totalPage) {
      this.snackBar.showSnackbar("Vui lòng nhập số trang hợp lệ! (Tổng số trang: " + totalPage + ")", "error")
    } else {
      this.page = inputPage
    }
  }

  constructor(private classroomService: ClassroomService,
              private studentService: StudentService,
              private teacherService: TeacherService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: SnackbarService) {
  }

  //HaNTT:
  ngOnInit() {
    console.log(this.teacherSelected)
    this.getStudentWhereClassIdNull();
    this.getTeacherList();
    //bắt tên lớp từ classCreateComponent
    this.classroomService.currentClassName.subscribe(
      name => {
        this.className = name;
      }
    );
  }

  //HaNTT: bắt checkBox list từ dialogStudentListComponent - check trùng:
  getStudentListChecked() {
    this.classroomService.currentStudentCheckedList.subscribe(
      list => {
        if (this.studentListSelected.length == 0) {
          this.studentListSelected = list;
        } else {
          for (let item of list) {
            let count = 0;
            let newElement = item;
            for (let element of this.studentListSelected) {
              if (element.studentId == item.studentId) {
                count++;
                newElement = element;
              }
            }
            if (count == 0) {
              this.studentListSelected.push(newElement);
            }
          }
        }
      }
    );
  }

  //HaNTT: lấy danh sách giáo viên chưa có lớp
  getTeacherList() {
    this.teacherService.findAllTeacherHasIdNull().subscribe(list => {
      this.teacherListClassIdNull = list;
      // this.teacherSelected = this.teacherListClassIdNull[0];
      console.log('list teacher:');
      console.log(list);
    }, error => {
      console.log('Lỗi get teacherList: ' + error);
    });
  }

  //HaNTT: lấy danh sách học sinh chưa có lớp
  getStudentWhereClassIdNull() {
    this.studentService.getStudentWhereClassIdNull().subscribe(list => {
      this.studentListClassIdNull = list;  //server trả về Page
      console.log('STUDENT list from API: ');
      console.log(list);
    }, error => {
      console.log('Lỗi get studentList: ' + error);
    });
  }

  //HaNTT: mở dialog check box học sinh
  openDialogCheckBox() {
    let dialogRef = this.dialog.open(DialogStudentListComponent, {
      width: '600px',
      data: {
        studentList: this.studentListClassIdNull,
        selectedList: this.studentListSelected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true'){
        this.getStudentListChecked();
      }
    });
  }

  //HaNTT: mở dialog xác nhận create
  openDialogConfirm() {
    console.log("-------vao event---------")

    if (this.className == '') {
      this.snackBar.showSnackbar("Vui lòng nhập tên lớp.", "error")
    } else if (this.teacherSelected == undefined) {
      this.snackBar.showSnackbar("Vui lòng thêm chọn giáo viên chủ nhiệm.", "error")
    } else if (this.studentListSelected.length == 0) {
      this.snackBar.showSnackbar("Bạn chưa tạo học sinh nào. Vui lòng thêm học sinh cho lớp.", "error")
    } else {
      let dialogRef = this.dialog.open(DialogConfirmCreateComponent, {
        width: '400px',
        data: {
          name: this.className,
          classroomSchoolYear: this.schoolYear,
          teacher: this.teacherSelected,
          studentList: this.studentListSelected
        }
      });
      dialogRef.afterClosed().subscribe(next => {
        console.log(next);
        if (next == 'true') {
          if (this.studentListSelected.length != 0 && this.className != '') {
            this.snackBar.showSnackbar("Tạo Lớp" + this.className + ", GVCN: " + this.teacherSelected.teacherName, "success")
            this.router.navigateByUrl("/classroom");
          } else {
            this.snackBar.showSnackbar("Vui lòng nhập đầy đủ tên lớp và đảm bảo danh sách lớp không rỗng", "error")}
        }
      });
    }
  }

  //HaNTT: Dialog xóa học sinh khỏi lớp:
  openDialogDelete(student: IStudent) {
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        object: "học sinh",
        id: student.studentId,
        name: student.studentName
      }
    });
    dialogRef.afterClosed().subscribe(next => {
      if (next == 'yes') {
        this.getStudentDel(student);
      }
    });
  }

  //HaNTT: hàm xóa student khỏi mảng tạm
  getStudentDel(student: IStudent) {
    this.studentListSelected.splice(this.studentListSelected.indexOf(student), 1);
    console.log(student.studentName);
    console.log(this.className);
    this.snackBar.showSnackbar("Xoá thành công học sinh " + student.studentName + " khỏi lớp " + this.className, "success");
  }

  //HaNTT: mở dialog create
  openDialogCreate() {
    let dialogRef = this.dialog.open(StudentCreateComponent,
      {
        height: '950px', width: '1100px',
      });
    dialogRef.afterClosed().subscribe(result => {
      this.getIdNewStudent();
    })
  }

  //HaNTT: Tìm new student theo Id (add mảng tạm)
  getIdNewStudent() {
    this.classroomService.currentStudentId.subscribe(id => {
      this.studentService.findById(id).subscribe(studentObj => {
        this.addNewStudentToTempList(studentObj);
        console.log(this.studentListSelected)
      })
    })
  }

  //checkDuplicate new student cho mảng tạm:
  addNewStudentToTempList(newStudent: IStudent) {
    if (this.studentListSelected.length == 0) {
      this.studentListSelected.push(newStudent);
    } else {
      let count = 0;
      for (let item of this.studentListSelected) {
        if (item.studentId == newStudent.studentId) {
          count++;
          break;
        }
      }
      if (count == 0) {
        this.studentListSelected.push(newStudent);
      }
    }
  }

  selectTeacher(event: any) {
    this.idTeacher = Number(event.target.value);
    for (let item of this.teacherListClassIdNull) {
      if (item.teacherId == this.idTeacher) {
        this.teacherSelected = item;
      }
    }
  }

}
