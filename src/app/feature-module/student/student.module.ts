import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {StudentRoutingModule} from './student-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { StudentListComponent } from './student-list/student-list.component';
import { SearchStudentComponent } from './search-student/search-student.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [StudentComponent, StudentListComponent, SearchStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ShareModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
