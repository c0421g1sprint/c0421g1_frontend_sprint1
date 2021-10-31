import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { SearchTeacherComponent } from './search-teacher/search-teacher.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [TeacherComponent, ListTeacherComponent, EditTeacherComponent, SearchTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule,

  ]
})
export class TeacherModule { }
