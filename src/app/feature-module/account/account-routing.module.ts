import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {AccountComponent} from './account.component';
import {ForgetComponent} from "./forget/forget.component";
import {UserGuard} from "../../core-module/account/user.guard";

const routes: Routes = [
  {path: "login", component: AccountComponent},
  {path: "forget", component: ForgetComponent},
  {path: 'account/editPass/:accountUsername', component: EditPasswordComponent, canActivate: [UserGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
