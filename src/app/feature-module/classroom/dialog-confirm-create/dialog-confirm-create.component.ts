import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {IClassroom} from "../../../entity/IClassroom";

@Component({
  selector: 'app-dialog-confirm-create',
  templateUrl: './dialog-confirm-create.component.html',
  styleUrls: ['./dialog-confirm-create.component.css']
})
export class DialogConfirmCreateComponent implements OnInit {

  newClassroom: IClassroom = {
    classroomId: null,
    classroomName: this.data.name,
    classroomSchoolYear: this.data.classroomSchoolYear,
    deleteFlag: false,
    teacher: this.data.teacher,
    grade: null,
    students: this.data.studentList,
    schedule: null
  };

  constructor(private classroomService: ClassroomService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log("confirm component: ");
    console.log(this.data.name);
    console.log(this.data.classroomSchoolYear);
    console.log(this.data.teacher);
    console.log(this.data.studentList);
    console.log("onInit - new Classroom");
    console.log(this.newClassroom);
  }


  //validate list student rỗng:
  checkListStudent : boolean = true;
  saveClass() {
    console.log("NEW CLASSROOM - save - confirmDialog");
    console.log(this.newClassroom);
    if (this.newClassroom.students.length != 0) {
      this.classroomService.createClass(this.newClassroom).subscribe(response => {
        console.log(response);
      }, error => {
        console.log("save - confirmDialog - lỗi create: " + error);
      });
    }
  }

}
