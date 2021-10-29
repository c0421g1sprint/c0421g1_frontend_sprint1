import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ShareModule} from "./share-module/share.module";
import {ViewScheduleComponent} from "./feature-module/schedule/view-schedule/view-schedule.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ViewScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
