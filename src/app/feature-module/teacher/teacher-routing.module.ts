import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {DetailTeacherComponent} from "./detail-teacher/detail-teacher.component";
import {CreateTeacherComponent} from "./create-teacher/create-teacher.component";

import {ScheduleTeacherComponent} from "./schedule-teacher/schedule-teacher.component";

import {EditInforTeacherComponent} from "./edit-infor-teacher/edit-infor-teacher.component";
import {DetailAccountComponent} from "../account/detail-account/detail-account.component";
import {CreateAccountComponent} from "../account/create-account/create-account.component";




const routes: Routes = [
  {path: 'teacher', component: TeacherComponent,
    children: [
      {path: 'create', component: CreateTeacherComponent},
      {path: 'list', component: ListTeacherComponent},
      {path: 'edit/:id', component: EditTeacherComponent},
      {path: 'detail/:teacherId', component: DetailTeacherComponent},

      {path: "scheduleTeacher", component:ScheduleTeacherComponent},

      {path: 'create', component: CreateTeacherComponent},
      {path:'editInfor/:id',component:EditInforTeacherComponent},
      {path:'account/detail',component:DetailAccountComponent},
      {path:'account/create',component:CreateAccountComponent},

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
