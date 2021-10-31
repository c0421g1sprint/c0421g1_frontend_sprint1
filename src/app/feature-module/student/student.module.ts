import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {StudentRoutingModule} from './student-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';


@NgModule({

  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentCreateComponent,
    StudentEditComponent,
    StudentSearchComponent
  ],

  imports: [
    CommonModule,
    StudentRoutingModule,
    ShareModule
  ]
})
export class StudentModule { }
