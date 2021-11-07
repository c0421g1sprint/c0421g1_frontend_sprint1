import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';

import {NgxLoadingModule} from "ngx-loading";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {ForgetComponent} from "./forget/forget.component";
import {CreateAccountComponent} from "./create-account/create-account.component";


@NgModule({
  declarations: [AccountComponent,EditPasswordComponent, ForgetComponent, CreateAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgxLoadingModule,
    ShareModule,
  ]
})
export class AccountModule { }
