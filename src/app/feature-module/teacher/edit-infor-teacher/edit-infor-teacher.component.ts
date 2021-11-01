import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ITeacher} from "../../../entity/ITeacher";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {DivisionService} from "../../../core-module/teacher/division.service";


@Component({
  selector: 'app-teacher-edit-infor',
  templateUrl: './edit-infor-teacher.component.html',
  styleUrls: ['./edit-infor-teacher.component.css']
})
export class EditInforTeacherComponent implements OnInit {

  editFormTeacher: FormGroup = new FormGroup({
    teacherId: new FormControl(""),
    teacherName: new FormControl(""),
    teacherGender: new FormControl(""),
    teacherDateOfBirth: new FormControl(""),
    division: new FormControl(""),
    teacherAddress: new FormControl("", [Validators.required]),
    teacherEmail: new FormControl("", [Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
    teacherPhone: new FormControl("", [Validators.required, Validators.pattern("^[(][84]{2}[)]\\\\+9[0-1]\\d{7}|09[0-1]\\d{7}$")]),

  });
  id: number;
  editInforTeacher: ITeacher;

  constructor(private teacherService: TeacherService, private divisionService: DivisionService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = +paraMap.get("id");
      this.getTeacher(this.id)
    });
  }

  ngOnInit(): void {

  }

  getTeacher(id: number) {
    return this.teacherService.findByIdTeacher(id).subscribe(next => {
      this.editInforTeacher = next;
      console.log(next)
      this.editFormTeacher.patchValue({
        teacherId: this.editInforTeacher.teacherId,
        teacherName: this.editInforTeacher.teacherName,
        teacherGender: this.editInforTeacher.teacherGender,
        teacherDateOfBirth: this.editInforTeacher.teacherDateOfBirth,
        division: this.editInforTeacher.division,
        teacherAddress: this.editInforTeacher.teacherAddress,
        teacherEmail: this.editInforTeacher.teacherEmail,
        teacherPhone: this.editInforTeacher.teacherPhone
      })
      // console.log(this.editFormTeacher.value);

    });
  }

  updateInfoTeacher() {
    this.teacherService.updateInfor(this.editFormTeacher.value).subscribe(() => {
      console.log(this.editFormTeacher.value)
      this.snackBar.open("Cập nhật thành công!", "", {
        duration: 2000,
      })
      this.router.navigateByUrl("teacher/list");
    })

  }

  validationMsg = {
    teacherAddress: [
      {type: "required", message: "Địa chỉ không được để trống"},
    ],
    teacherEmail: [
      {type: "required", message: "Email không được để trống"},
      {type: "pattern", message: "Email phải đúng định dạng. Ví dụ: abc@gmail.com"},
    ],
    teacherPhone: [
      {type: "required", message: "Số điện thoại không được để trống"},
      {
        type: "pattern",
        message: "Số điện thoại phải đúng định dạng. Ví dụ: 090xxxxxxx hoặc 091xxxxxxx hoặc (84)90xxxxxxx hoặc (84)91xxxxxxx"
      }
    ],
  }
}
