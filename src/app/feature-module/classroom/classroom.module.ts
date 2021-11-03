import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import {ClassroomRoutingModule} from './classroom-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomEditComponent } from './classroom-edit/classroom-edit.component';
import { ClassroomCreateComponent } from './classroom-create/classroom-create.component';
import { ClassroomInputInforComponent } from './classroom-input-infor/classroom-input-infor.component';
import { DialogConfirmCreateComponent } from './dialog-confirm-create/dialog-confirm-create.component';
import { DialogStudentListComponent } from './dialog-student-list/dialog-student-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import { PromoteConfirmComponent } from './promote-confirm/promote-confirm.component';



@NgModule({
  declarations: [ClassroomComponent, ClassroomListComponent, ClassroomEditComponent, ClassroomCreateComponent, ClassroomInputInforComponent, DialogConfirmCreateComponent, DialogStudentListComponent, PromoteConfirmComponent],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    ShareModule,
    NgxPaginationModule
  ]
})
export class ClassroomModule { }
