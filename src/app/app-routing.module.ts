import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewScheduleComponent} from "./feature-module/schedule/view-schedule/view-schedule.component";

const routes: Routes = [

  // {path: '404', component: PageNotFoundComponent},
  // {path: '**' ,redirectTo: '/404'}
  {path: '', component: ViewScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
