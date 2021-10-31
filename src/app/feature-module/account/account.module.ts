import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ForgetComponent } from './forget/forget.component';
import {NgxLoadingModule} from "ngx-loading";



@NgModule({
  declarations: [AccountComponent, ForgetComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgxLoadingModule,
    ShareModule,

  ]
})
export class AccountModule { }
