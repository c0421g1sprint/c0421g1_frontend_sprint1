import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from "./account.component";
import {DetailAccountComponent} from "./detail-account/detail-account.component";
import {CreateAccountComponent} from "./create-account/create-account.component";


const routes: Routes = [{path: 'account', component: AccountComponent,
  children: [
    {path: 'detail/:accountId', component: DetailAccountComponent},
    {path: 'create', component: CreateAccountComponent},
  ]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
