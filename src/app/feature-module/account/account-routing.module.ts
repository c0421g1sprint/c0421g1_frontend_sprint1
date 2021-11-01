import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPasswordComponent} from "./edit-password/edit-password.component";


const routes: Routes = [
  {
    path: 'account/editPass/:accountUsername',
    component: EditPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
