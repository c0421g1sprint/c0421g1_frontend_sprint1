import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
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
              private studentService: StudentService,
              private router: Router) {
      this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.studentService.findById(id).subscribe(next => {
        this.student = next;
      });
  });
  }
  ngOnInit(): void {
  }

  quayLai() {
    this.router.navigate(['students', {
      "idClassroom": this.student.classroom.classroomId
    }]);
  }
}
