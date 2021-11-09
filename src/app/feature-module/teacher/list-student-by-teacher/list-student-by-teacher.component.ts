import {StudentListFromTeacher} from "../../../entity/student-list-from-teacher";
import {Component, OnInit} from "@angular/core";
import {ListStudentByTeacherService} from "../../../core-module/student/studentByTeacher/list-student-by-teacher.service";
import {StorageService} from "../../../core-module/account/storage.service";

@Component({
  selector: 'app-list-student-by-teacher',
  templateUrl: './list-student-by-teacher.component.html',
  styleUrls: ['./list-student-by-teacher.component.css']
})
export class ListStudentByTeacherComponent implements OnInit {
  page: number = 0;
  responsePage: any;
  totalElement: number = 0;
  students: StudentListFromTeacher[];
  sizePage = 10;

  constructor(private studentService: ListStudentByTeacherService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.listStudent(this.page);
  }

  listStudent(page: any) {
    this.studentService.getListStudentByIdTeacher(this.storageService.getUsernameFromSession(), page).subscribe(value => {
      this.responsePage = value;
      this.students = value.content;
      this.totalElement = value.totalElement;
      console.log(value.content);
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
