import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";
import {IStudent} from "../../../entity/IStudent";

@Component({
  selector: 'app-dialog-student-list',
  templateUrl: './dialog-student-list.component.html',
  styleUrls: ['./dialog-student-list.component.css']
})
export class DialogStudentListComponent implements OnInit {

  checkArr: IStudent[] = [];
  displayList: IStudent[] = [];

  constructor(private classroomService: ClassroomService,
              @Inject(MAT_DIALOG_DATA) public data: IStudent[] | any) {
    console.log(data.studentList)
  }

  ngOnInit(): void {
    this.getDisplayList();
  }

  getDisplayList() {
    if (this.data.selectedList.length == 0) {
      this.displayList = this.data.studentList;
    } else {
      for (let item of this.data.studentList) {
        let count = 0;
        let newElement = item;
        for (let element of this.data.selectedList) {
          if (element.studentId == item.studentId) {
            count++;
            newElement = element;
          }
        }
        if (count == 0) {
          this.displayList.push(newElement);
        }
      }
    }
  }
  // close() {
  //   this.dialogRef.close();
  // }

  //HaNTT 27/10 - 1:45
  //hàm truyền List lớp giữa 2 component:
  save() {
    console.log("checkbox component - checkArr: ");
    console.log(this.checkArr);
    this.classroomService.changeStudentCheckedList(this.checkArr);
  }

  isChecked(value: any, studentId: any) {
    if (value.currentTarget.checked) {
      this.checkArr.push(studentId);
    } else {
      this.checkArr = this.checkArr.filter(item => item != studentId)
    }
    console.log(this.checkArr)
  }

}
