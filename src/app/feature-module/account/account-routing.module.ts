import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import {ForgetComponent} from "./forget/forget.component";


const routes: Routes = [
  {path: "login", component: AccountComponent},
  {path: "forget", component: ForgetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
