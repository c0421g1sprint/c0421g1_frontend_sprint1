import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ClassroomService} from "../../../core-module/classroom/classroom.service";

@Component({
  selector: 'app-promote-confirm',
  templateUrl: './promote-confirm.component.html',
  styleUrls: ['./promote-confirm.component.css']
})
export class PromoteConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
  }

}
