import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import {SnackbarComponent} from "./snackbar/snackbar.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import {AngularFireModule} from "@angular/fire";

import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";


@NgModule({
  declarations: [
    DialogDeleteComponent,
    SnackbarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    DialogDeleteComponent,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ]
})
export class ShareModule { }
