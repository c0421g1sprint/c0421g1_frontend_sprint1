import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentSearchComponent} from "./student-search/student-search.component";
import {StudentComponent} from "./student.component";


const routes: Routes = [
  {
    path: "students", component: StudentComponent,
    children: [
      {path: "", component: StudentListComponent},
      {path: "search", component: StudentSearchComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
