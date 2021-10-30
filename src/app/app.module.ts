import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TeacherModule} from './feature-module/teacher/teacher.module';
import {ShareModule} from "./share-module/share.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShareModule,
      ToastrModule,
      ToastrModule.forRoot(),
      // CoreModuleModule,
      // FeatureModuleModule,
      // ShareModuleModule,
      BrowserAnimationsModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
