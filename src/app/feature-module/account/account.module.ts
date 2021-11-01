import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {NgxLoadingModule} from "ngx-loading";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {ForgetComponent} from "./forget/forget.component";



@NgModule({
  declarations: [AccountComponent,EditPasswordComponent, ForgetComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgxLoadingModule,
    ShareModule,
  ]
})
export class AccountModule { }
