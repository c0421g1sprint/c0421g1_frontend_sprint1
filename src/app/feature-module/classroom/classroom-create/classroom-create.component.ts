import {Component, OnInit} from '@angular/core';
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  styleUrls: ['./classroom-create.component.css']
})
export class ClassroomCreateComponent implements OnInit {
  schoolYear: String = (new Date().getFullYear()).toString(); //mặc định: năm hiện tại
  className: String = '';

  constructor(private classroomService: ClassroomService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  //HaNTT 27/10 - 1:45
  checkClassroomDuplicated(inputClassName: string) {
    this.className = inputClassName;
    console.log(inputClassName);
    this.classroomService.isClassDuplicated(inputClassName, this.schoolYear).subscribe(data => { //trùng - invalid
        this.snackBar.open("Lớp " + this.className + " niên khóa " +
          this.schoolYear + " đã tồn tại! Vui lòng nhập tên khác.", null, {duration: 4000});
        console.log(data);
      }, error => {
        console.log("create component-checkDupplicate-không trùng: ")
        this.classroomService.changeClassName(inputClassName);
        //chuyển trang:
        if (this.className != '' && this.className.match('^(1A)[1-9]$')) {
          this.router.navigateByUrl('/classroom/inputInfo');
        }
      }
    );
  }

  //


  //validate className:
  checkPattern: boolean = true;
  checkRequired: boolean = true;

  checkName(className: string) {
    //checkPattern;
    const regex = '^(1A)[1-9]$';
    this.checkPattern = !!className.match(regex);
    //check name blank:
    this.checkRequired = className != '';
  }
}
