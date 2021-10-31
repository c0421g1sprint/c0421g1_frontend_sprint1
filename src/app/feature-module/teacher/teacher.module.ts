import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherComponent} from './teacher.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {DetailTeacherComponent} from './detail-teacher/detail-teacher.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {ListStudentByTeacherComponent} from "./list-teacher/list-student-by-teacher/list-student-by-teacher.component";
import {StudentDetailInListComponent} from './list-teacher/student-detail-in-list/student-detail-in-list.component';

@NgModule({
  declarations: [TeacherComponent,
    ListTeacherComponent, EditTeacherComponent,
    DetailTeacherComponent,
    CreateTeacherComponent,
    ListStudentByTeacherComponent,
    StudentDetailInListComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule
  ]
})
export class TeacherModule {
}
