
import { StudentComponent } from './student.component';
import {StudentRoutingModule} from './student-routing.module';
import {ShareModule} from '../../share-module/share.module';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";




@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    ShareModule,
    StudentRoutingModule,
  ]
})
export class StudentModule { }
