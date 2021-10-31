import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import {EditInforTeacherComponent} from "./edit-infor-teacher/edit-infor-teacher.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [TeacherComponent, ListTeacherComponent, EditTeacherComponent, EditInforTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TeacherModule { }
