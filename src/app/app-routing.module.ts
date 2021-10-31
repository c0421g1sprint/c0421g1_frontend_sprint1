import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchTeacherComponent} from "./feature-module/teacher/search-teacher/search-teacher.component";

const routes: Routes = [
  // {path: '404', component: PageNotFoundComponent},
  // {path: '**' ,redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
