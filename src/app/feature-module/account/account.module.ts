import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';



@NgModule({
  declarations: [AccountComponent, CreateAccountComponent, DetailAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ShareModule
  ]
})
export class AccountModule { }
