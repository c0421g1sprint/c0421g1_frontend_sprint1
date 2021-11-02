import {Component, OnInit} from '@angular/core';
import {IClassroom} from "../../../entity/IClassroom";
import {IStudent} from "../../../entity/IStudent";
import {ITeacher} from "../../../entity/ITeacher";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {StudentCreateComponent} from "../../student/student-create/student-create.component";
import {StudentService} from "../../../core-module/student/student.service";

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.css']
})
export class ClassroomEditComponent implements OnInit {

  //DanhNT
  id: number;

  //DanhNT
  classroom: IClassroom;

  //DanhNT
  nameClass: string;

  //DanhNT
  studentList: IStudent[] = [];
  newStudent: IStudent;

  //DanhNT
  teacherList: ITeacher[];
  newTeacher: ITeacher;

  //DanhNT
  studentDeleteList: Array<IStudent> = new Array();

  //DanhNT
  idTeacher: string;

  //DanhNT code paging
  page: number = 1;

  goToPage(inputPage: number, totalPage: number) {
    console.log("tổng trang: ");
    console.log(inputPage);
    console.log(typeof inputPage);
    console.log(totalPage);
    if (inputPage < 1 || inputPage > totalPage) {
      this.snackBar.showSnackbar("Vui lòng nhập số trang hợp lệ! (Tổng số trang: " + totalPage + ")", "error");
    } else {
      this.page = inputPage
    }
  }

  //DanhNT
  constructor(private classroomService: ClassroomService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: SnackbarService,
              private teacherService: TeacherService,
              private router: Router,
              private studentService: StudentService) {
  }

  //DanhNT
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getTeacherList();
    });
  }

  //DanhNT
  getTeacherList() {
    this.teacherService.findAllTeacherHasIdNull().subscribe(list => {
      this.teacherList = list;
      this.getClassroomById(this.id);
    });
  }

  //DanhNT
  getClassroomById(index: number) {
    this.classroomService.findClassroomById(index).subscribe(obj => {
      this.classroom = obj;
      this.getListStudent(index);
    });
  }

  //DanhNT
  openDialog(className: string, student: IStudent) {
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        object: 'học sinh khỏi lớp ' + className,
        id: student.studentId,
        name: student.studentName,
      }
    });
    dialogRef.afterClosed().subscribe(next => {
      if (next == 'yes') {
        this.getStudentDel(student);
      }
    });
  }


  //DanhNT
  getStudentDel(student: IStudent) {
    this.studentDeleteList.push(student);
    this.studentList.splice(this.studentList.indexOf(student), 1);
    this.snackBar.showSnackbar("Xoá thành công!!", "success");
    this.classroom.students = this.studentList;
  }

  //DanhNT
  selectTeacher($event: any) {
    this.idTeacher = $event.target.value;
    if (this.idTeacher == '') {
      this.idTeacher = String(this.classroom.teacher.teacherId);
    }

    console.log(this.classroom);
  }

  //DanhNT
  apiDeleteStudent() {
    this.classroomService.deleteStudentFromClass(this.studentDeleteList).subscribe(next => {
      this.snackBar.showSnackbar('Sửa thành công!!', "success");
      this.router.navigateByUrl('/classroom');
    });
  }

  //DanhNT
  setValueForEdit() {
    this.classroom.students = this.studentList;
    for (let teacher of this.teacherList) {
      if (teacher.teacherId == (Number(this.idTeacher))) {
        this.classroom.teacher = teacher;
        break;
      }
    }
    console.log(this.classroom);
  }

  //DanhNT
  submitEdit() {
    this.updateClass();
  }


  //DanhNT
  getListStudent(id: number) {
    this.classroomService.getListStudentByClassroom(id).subscribe(obj => {
      this.studentList = obj;
    });
  }

  //DanhNT
  updateClass() {
    this.setValueForEdit();
    this.classroomService.updateClass(this.classroom).subscribe(next => {
      this.apiDeleteStudent();
    })
  }

  //DanhNT
  openDialogCreate() {
    let dialogRef = this.dialog.open(StudentCreateComponent,
      {
        height: '950px', width: '1100px'
        , data: {listNewStudent: this.studentList}
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getIdNewStudent();
    })
  }

//HaNTT: Tìm new student theo Id (add mảng tạm)
  getIdNewStudent() {
    this.classroomService.currentStudentId.subscribe(id => {
      this.studentService.findById(id).subscribe(studentObj => {
        this.addNewStudentToTempList(studentObj);
      })
    })
  }

  //checkDuplicate new student cho mảng tạm:
  addNewStudentToTempList(newStudent: IStudent) {
    if (this.studentList.length == 0) {
      this.studentList.push(newStudent);
    } else {
      let count = 0;
      for (let item of this.studentList) {
        if (item.studentId == newStudent.studentId) {
          count++;
          break;
        }
      }
      if (count == 0) {
        this.studentList.push(newStudent);
      }
    }
  }




}
