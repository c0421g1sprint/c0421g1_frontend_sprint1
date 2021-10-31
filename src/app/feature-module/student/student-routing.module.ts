import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentSearchComponent} from "./student-search/student-search.component";


const routes: Routes = [
  {
    path: "students", component: StudentListComponent,
    children: [
      {path: "", component: StudentListComponent}
    ],
  },
  {
    path: "student/search", component: StudentSearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
