import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentDetailInListService} from "../../../../core-module/student/studentDetailInList/student-detail-in-list.service";
import {IStudent} from "../../../../../entity/IStudent";

@Component({
  selector: 'app-student-detail-in-list',
  templateUrl: './student-detail-in-list.component.html',
  styleUrls: ['./student-detail-in-list.component.css']
})
export class StudentDetailInListComponent implements OnInit {

  student:IStudent;

  constructor(private route: ActivatedRoute,
              public studentDetail:StudentDetailInListService
             ) {
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('idStudent');
    console.log(studentId);
    this.studentDetail.studentDetailInList(studentId).subscribe(data => {
      this.student= data;
      console.log(this.student);
      console.log(this.student.studentName)
    });
  }

}
