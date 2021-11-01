
import {HeaderComponent} from "./header/header.component";
import {SnackbarComponent} from "./snackbar/snackbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FooterComponent} from "./footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";



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
    HttpClientModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ShareModule { }



