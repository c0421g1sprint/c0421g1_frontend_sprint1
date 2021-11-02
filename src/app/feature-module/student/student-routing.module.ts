
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListStudentByTeacherComponent} from "../teacher/list-student-by-teacher/list-student-by-teacher.component";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
