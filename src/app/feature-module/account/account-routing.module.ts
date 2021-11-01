import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {AccountComponent} from './account.component';
import {ForgetComponent} from "./forget/forget.component";


const routes: Routes = [
  {path: "login", component: AccountComponent},
  {path: "forget", component: ForgetComponent},
  {path: 'account/editPass/:accountUsername', component: EditPasswordComponent},
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
