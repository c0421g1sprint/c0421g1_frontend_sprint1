import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScheduleComponent} from "./schedule.component";
import {ViewScheduleComponent} from "./view-schedule/view-schedule.component";
import {EditScheduleComponent} from "./edit-schedule/edit-schedule.component";



const routes: Routes = [
  {
    path: "schedule", component: ScheduleComponent, children: [
      {
        path: "list", component: ViewScheduleComponent
      },
      {
        path: "edit/:id",component: EditScheduleComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
