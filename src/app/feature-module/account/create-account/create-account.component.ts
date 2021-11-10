import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {AccountService} from "../../../core-module/account/account.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  public formAddNewAccount: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public accountService: AccountService,
    public snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    this.formAddNewAccount = this.formBuilder.group({
      accountUsername: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]{8,30}$")]],
      accountPassword: ['', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{8,30}$")]],
      email: [this.data.email, [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.ConfirmedValidator('accountPassword', 'confirmPassword')})
  }

  ngOnInit(): void {
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  addWewAccount() {
    this.accountService.addNewAccount(this.formAddNewAccount.value,this.data.id).subscribe(data => {
      this.snackBar.showSnackbar('Thêm mới thành công', 'success');
      document.getElementById("close").click();
    }, error => {
      this.snackBar.showSnackbar('Thêm mới thất bại tài khoản đã tồn tại', 'error');
    })
  };
}
