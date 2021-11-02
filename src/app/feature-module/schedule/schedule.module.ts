import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { DialogScheduleComponent } from './dialog-schedule/dialog-schedule.component';





@NgModule({
  declarations: [ScheduleComponent, ViewScheduleComponent, EditScheduleComponent, DialogScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ShareModule
  ]
})
export class ScheduleModule { }
