import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStudentByTeacherComponent} from "./feature-module/teacher/list-teacher/list-student-by-teacher/list-student-by-teacher.component";

const routes: Routes = [

  // {path: '404', component: PageNotFoundComponent},
  // {path: '**' ,redirectTo: '/404'}

  // {path: "listStudentByTeacher", component: ListStudentByTeacherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
