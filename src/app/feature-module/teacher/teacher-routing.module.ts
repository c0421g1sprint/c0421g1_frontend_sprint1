import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {CreateTeacherComponent} from "./create-teacher/create-teacher.component";
import {ListStudentByTeacherComponent} from "./list-student-by-teacher/list-student-by-teacher.component";
import {StudentDetailInListComponent} from "./student-detail-in-list/student-detail-in-list.component";
import {ScheduleTeacherComponent} from "./schedule-teacher/schedule-teacher.component";
import {EditInforTeacherComponent} from "./edit-infor-teacher/edit-infor-teacher.component";
import {UserGuard} from "../../core-module/account/user.guard";
import {SearchTeacherComponent} from "./search-teacher/search-teacher.component";





const routes: Routes = [
  {path: 'teacher', component: TeacherComponent,
    children: [
      //Bao router
      {path: 'create', component: CreateTeacherComponent},
      {path: 'edit/:id', component: EditTeacherComponent},

      //Linh router
      {path: 'list', component: ListTeacherComponent},

      //Phuc router
      {path: "scheduleTeacher", component:ScheduleTeacherComponent , canActivateChild: [UserGuard]},
      {path: "listStudentByTeacher", component: ListStudentByTeacherComponent, canActivateChild: [UserGuard]},

      //Minh router
      {path: 'update', component: EditInforTeacherComponent},

      //Phuc router
      {path: "detail-Teacher/:idStudent",component:StudentDetailInListComponent},
      // Diep router
      {path: "search",component:SearchTeacherComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
