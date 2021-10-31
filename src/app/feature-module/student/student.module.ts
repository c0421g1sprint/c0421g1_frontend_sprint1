import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {StudentRoutingModule} from './student-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { StudentCreateComponent } from './student-create/student-create.component';



@NgModule({
  declarations: [StudentComponent, StudentCreateComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ShareModule,

  ]
})
export class StudentModule { }
