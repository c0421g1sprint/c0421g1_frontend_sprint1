import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {StudentRoutingModule} from './student-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSearchComponent } from './student-search/student-search.component';



@NgModule({
  declarations: [StudentComponent, StudentListComponent, StudentSearchComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ShareModule
  ]
})
export class StudentModule { }
