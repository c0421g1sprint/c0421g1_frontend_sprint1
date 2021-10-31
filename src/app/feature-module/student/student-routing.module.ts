import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {SearchStudentComponent} from "./search-student/search-student.component";


const routes: Routes = [
  {
    path: "students", component: StudentListComponent,
    children: [
      {path: "", component: StudentListComponent},
      {path: "searchstudent", component: SearchStudentComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
