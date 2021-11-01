import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { DetailTeacherComponent } from './detail-teacher/detail-teacher.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ScheduleTeacherComponent } from './list-teacher/schedule-teacher/schedule-teacher.component';

@NgModule({
  declarations: [TeacherComponent, ListTeacherComponent, EditTeacherComponent, DetailTeacherComponent, CreateTeacherComponent, ScheduleTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule
  ]
})
export class TeacherModule { }
