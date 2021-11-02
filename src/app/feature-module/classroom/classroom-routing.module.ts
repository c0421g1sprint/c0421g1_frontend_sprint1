import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomListComponent} from "./classroom-list/classroom-list.component";
import {ClassroomComponent} from "./classroom.component";
import {ClassroomEditComponent} from "./classroom-edit/classroom-edit.component";
import {ClassroomCreateComponent} from "./classroom-create/classroom-create.component";
import {ClassroomInputInforComponent} from "./classroom-input-infor/classroom-input-infor.component";


const routes: Routes = [
  {
    path: "classroom", component: ClassroomComponent, children: [
      {
        path: "", component: ClassroomListComponent
      },
      {
        path: "edit/:id",component: ClassroomEditComponent
      },
      {
        path: "create", component: ClassroomCreateComponent
      },
      {
        path: "inputInfo",component: ClassroomInputInforComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule {
}
