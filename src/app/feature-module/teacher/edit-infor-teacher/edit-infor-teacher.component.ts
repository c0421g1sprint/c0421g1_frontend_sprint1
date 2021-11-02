import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ITeacher} from "../../../entity/ITeacher";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {DivisionService} from "../../../core-module/teacher/division.service";
import {StorageService} from "../../../core-module/account/storage.service";


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
    teacherPhone: new FormControl("", [Validators.required, Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b")]),
    account: new FormControl(""),
    degree: new FormControl(""),
    teacherUniversity: new FormControl(""),
    deleteFlag: new FormControl(""),
    teacherImage: new FormControl("")

  });

  editInforTeacher: ITeacher;
  constructor(private teacherService: TeacherService, private divisionService: DivisionService,
              private snackBar: MatSnackBar,private route: Router, private storageService: StorageService) {
    this.getTeacherByAccountName()
  }

  ngOnInit(): void {

  }

  getTeacherByAccountName() {
    if (this.storageService.getToken()){
      return this.teacherService.findByAccountNameTeacher(this.storageService.getUsernameFromSession()).subscribe(next => {
        this.editInforTeacher = next;
        console.log(next)
        this.editFormTeacher.setValue(this.editInforTeacher)
        console.log(this.editFormTeacher.controls.division.value.divisionName + "12345684")
      });
    }
  }

  updateInforTeacherByAccountName() {
    this.teacherService.updateInforByAccountName(this.editFormTeacher.value).subscribe(()=>{
      console.log(this.editFormTeacher.value)
      this.route.navigateByUrl("")
      this.snackBar.open("Cập nhật thành công!", "", {
        duration: 2000,
      })
    })
  }

  validationMsg = {
    teacherAddress: [
      {type: "required", message: "Địa chỉ không được để trống."},
    ],
    teacherEmail: [
      {type: "required", message: "Email không được để trống"},
      {type: "pattern", message: "Email phải đúng định dạng. Ví dụ: abc@gmail.com."},
    ],
    teacherPhone: [
      {type: "required", message: "Số điện thoại không được để trống."},
      {type: "pattern", message: "Số điện thoại phải đúng định dạng. Ví dụ: 090xxxxxxx hoặc 091xxxxxxx hoặc (84)90xxxxxxx hoặc (84)91xxxxxxx."}
    ],
  }

}
