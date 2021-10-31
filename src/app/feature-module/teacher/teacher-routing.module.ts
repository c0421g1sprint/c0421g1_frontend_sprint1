import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {EditInforTeacherComponent} from "./edit-infor-teacher/edit-infor-teacher.component";

const routes: Routes = [
  {path: 'teacher', component: TeacherComponent,
    children: [
      {path: 'list', component: ListTeacherComponent},
      {path: 'edit/:id', component: EditTeacherComponent},
      {path: 'updateInfor/:id', component: EditInforTeacherComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
