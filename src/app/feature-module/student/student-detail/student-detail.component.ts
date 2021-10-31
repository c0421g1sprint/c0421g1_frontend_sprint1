import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IStudent} from '../../../entity/IStudent';
import {StudentService} from "../../../core-module/student/student.service";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: IStudent;
  constructor(private activatedRouter: ActivatedRoute,
              private studentService: StudentService) {
      this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      console.log(id);
      this.studentService.getStudentById(id).subscribe(next => {
        console.log(next);
        this.student = next;
      });
  });
  }
  ngOnInit(): void {}
}
