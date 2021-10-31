import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ShareModule} from "./share-module/share.module";
import {TeacherModule} from "./feature-module/teacher/teacher.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShareModule,
        TeacherModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
