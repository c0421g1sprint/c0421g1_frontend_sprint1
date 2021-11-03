import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScheduleComponent} from "./schedule.component";
import {ViewScheduleComponent} from "./view-schedule/view-schedule.component";
import {EditScheduleComponent} from "./edit-schedule/edit-schedule.component";
import {AdminGuard} from "../../core-module/account/admin.guard";



const routes: Routes = [
  {path: "schedule", component: ScheduleComponent, children: [
      {path: "list", component: ViewScheduleComponent},
      {path: "edit/:id",component: EditScheduleComponent, canActivate: [AdminGuard]},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
