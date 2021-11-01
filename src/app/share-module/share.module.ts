
import {HeaderComponent} from "./header/header.component";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import {SnackbarComponent} from "./snackbar/snackbar.component";
import {FooterComponent} from "./footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "../../environments/environment";
import {AngularFireModule} from "@angular/fire";



@NgModule({
  declarations: [
    DialogDeleteComponent,
    SnackbarComponent,
    FooterComponent,
    HeaderComponent,

  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ]
})
export class ShareModule { }


