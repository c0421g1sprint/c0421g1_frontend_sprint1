import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import {ClassroomRoutingModule} from './classroom-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [ClassroomComponent],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    ShareModule
  ]
})
export class ClassroomModule { }
