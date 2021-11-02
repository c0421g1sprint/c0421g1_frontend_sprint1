import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';





@NgModule({
  declarations: [TeacherComponent, ListTeacherComponent, EditTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule
  ]
})
export class TeacherModule { }
