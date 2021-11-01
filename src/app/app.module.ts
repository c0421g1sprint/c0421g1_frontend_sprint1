import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ShareModule} from "./share-module/share.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClassroomModule} from "./feature-module/classroom/classroom.module";
import {StudentModule} from "./feature-module/student/student.module";
import {AccountModule} from "./feature-module/account/account.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    ShareModule,
    ClassroomModule,
    StudentModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
