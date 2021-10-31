import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {EditPasswordComponent} from "./edit-password/edit-password.component";


@NgModule({
  declarations: [AccountComponent,EditPasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ShareModule
  ]
})
export class AccountModule { }
