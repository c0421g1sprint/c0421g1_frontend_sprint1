import {Component, Inject, OnInit} from '@angular/core';
import {IMark} from "../../../entity/IMark";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MarkService} from "../../../core-module/student/mark.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";


@Component({
  selector: 'app-mark-edit',
  templateUrl: './mark-edit.component.html',
  styleUrls: ['./mark-edit.component.css']
})
export class MarkEditComponent implements OnInit {

  //MinhNN update 02/11
  editMarkForm: FormGroup = new FormGroup({
    markId: new FormControl(''),
    markPointNumber1: new FormControl('', [Validators.required,Validators.min(0),Validators.max(10),Validators.pattern("^[0-9]*-?\\d*[.,]?\\d{0,2}$"),]),
    markPointNumber2: new FormControl('',[Validators.required,Validators.min(0),Validators.max(10),Validators.pattern("^[0-9]*-?\\d*[.,]?\\d{0,2}$")]),
    markPointNumber3: new FormControl('',[Validators.required,Validators.min(0),Validators.max(10),Validators.pattern("^[0-9]*-?\\d*[.,]?\\d{0,2}$")]),
    student: new FormControl(''),
    subject: new FormControl('')
  });
  iMark: IMark;

  constructor(private markService: MarkService,private route: Router, private snackBar: SnackbarService,
              @Inject(MAT_DIALOG_DATA) private data : any) {}

  ngOnInit(): void {
    this.getMark(this.data.obj.markId);
  }

  getMark(id: number){
    this.markService.findById(id).subscribe(next=> {
      this.iMark = next;
      console.log(next);
      this.editMarkForm.setValue(next);
    })
  }
  updateMark() {
    this.markService.update(this.editMarkForm.value).subscribe(next => {
      console.log(next);
      this.route.navigateByUrl("/students/mark")
      this.snackBar.showSnackbar("Cập nhật thành công!", "success")
    })
  }

  validationMsg = {
    markPointNumber1: [
      {type: "required", message: "Điểm không được để trống."},
      {type: "max", message: "Điểm không được quá 10"},
      {type: "min", message: "Điểm không được dưới 0"},
      {type: "pattern", message: "Không được nhập chữ"}
    ],
    markPointNumber2: [
      {type: "required", message: "Điểm không được để trống."},
      {type: "max", message: "Điểm không được quá 10"},
      {type: "min", message: "Điểm không được dưới 0"},
      {type: "pattern", message: "Không được nhập chữ"}

    ],

    markPointNumber3: [
      {type: "required", message: "Điểm không được để trống."},
      {type: "max", message: "Điểm không được quá 10"},
      {type: "min", message: "Điểm không được dưới 0"},
      {type: "pattern", message: "Không được nhập chữ"}
    ]}

}
