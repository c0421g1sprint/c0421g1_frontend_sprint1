import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-schedule',
  templateUrl: './dialog-schedule.component.html',
  styleUrls: ['./dialog-schedule.component.css']
})
export class DialogScheduleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA ) public data : any) { }

  ngOnInit(): void {
  }

}
