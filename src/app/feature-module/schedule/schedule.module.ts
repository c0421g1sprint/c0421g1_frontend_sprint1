import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';




@NgModule({
  declarations: [ScheduleComponent, ViewScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ShareModule
  ]
})
export class ScheduleModule { }
