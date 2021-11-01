import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ShareModule} from "./share-module/share.module";
import {ScheduleModule} from "./feature-module/schedule/schedule.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShareModule,
        ScheduleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
