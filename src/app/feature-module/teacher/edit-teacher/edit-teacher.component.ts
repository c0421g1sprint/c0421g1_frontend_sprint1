import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {
    let id = this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
  }

}
