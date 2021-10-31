import { Component, OnInit } from '@angular/core';
import {IStudent} from "../../../../../entity/IStudent";
import {ListStudentByTeacherService} from "../../../../core-module/student/studentByTeacher/list-student-by-teacher.service";


@Component({
  selector: 'app-list-student-by-teacher',
  templateUrl: './list-student-by-teacher.component.html',
  styleUrls: ['./list-student-by-teacher.component.css']
})
export class ListStudentByTeacherComponent implements OnInit {
  page: number = 0;

  responsePage: any;
  totalElement: number = 0;

  students: IStudent[];

  constructor(private studentService: ListStudentByTeacherService) {
  }

  ngOnInit(): void {
    this.listStudent(this.page);
  }

  listStudent(page: any) {
    this.studentService.getListStudentByIdTeacher(1, page).subscribe(value => {
      this.responsePage = value;
      this.students = value.content;
      this.totalElement = value.totalElement;
      console.log(value.content);
      console.log(this.students[0]);
      console.log(this.students[0].classroom.classroomName);
    });
    console.log(this.students);
  }


  previousPage() {

    this.page = this.page - 1;

    this.listStudent(this.page);
  }


  nextPage() {

    this.page = this.page + 1;

    this.listStudent(this.page);
  }

  getPage(value: number) {

    this.page = Number(value-1)
    this.listStudent(this.page);
  }

}
