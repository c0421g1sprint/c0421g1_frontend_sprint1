import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentSearchComponent} from "./student-search/student-search.component";
import {StudentComponent} from "./student.component";
import {StudentEditComponent} from "./student-edit/student-edit.component";
import {StudentDetailComponent} from "./student-detail/student-detail.component";


const routes: Routes = [
  {
    path: "students", component: StudentComponent,
    children: [
      {path: "", component: StudentListComponent},
      {path: "search", component: StudentSearchComponent},
      {path: "edit/:id", component: StudentEditComponent},
      {path: "detail/:id", component: StudentDetailComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
