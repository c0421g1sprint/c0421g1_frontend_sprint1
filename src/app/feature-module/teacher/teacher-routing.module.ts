import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {DetailTeacherComponent} from "./detail-teacher/detail-teacher.component";
import {CreateTeacherComponent} from "./create-teacher/create-teacher.component";
import {ScheduleTeacherComponent} from "./list-teacher/schedule-teacher/schedule-teacher.component";

const routes: Routes = [
  {path: 'teacher', component: TeacherComponent,
    children: [
      {path: 'create', component: CreateTeacherComponent},
      {path: 'list', component: ListTeacherComponent},
      {path: 'edit/:teacherId', component: EditTeacherComponent},
      {path: 'detail/:teacherId', component: DetailTeacherComponent},

      {path: "scheduleTeacher", component:ScheduleTeacherComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
