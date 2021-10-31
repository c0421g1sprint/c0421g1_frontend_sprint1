import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IEditPasswordAccountDto} from '../../../entity/IEditPassAccount';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IEditAccount} from '../../../entity/iedit-account';
import {AccountService} from "../../../core-module/account/account.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  editPassAccountForm: FormGroup;
  id: number;
  message: string;
  accountDto: IEditAccount;
  editPasswordAccountDto: IEditPasswordAccountDto;
  constructor(private activedRouter: ActivatedRoute ,
              private accountService: AccountService,
              private matSnackBar: MatSnackBar) {
      activedRouter.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = +paramMap.get('id');
        this.accountService.getAccountById(this.id).subscribe(next => {
          this.accountDto = next;
          console.log(next);
        });
        console.log(this.id);
        this.editPassAccountForm = new FormGroup({
          accountId: new FormControl(this.id),
          accountPassword: new FormControl('' ,
            Validators.compose([Validators.required, Validators.minLength(4),
              Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')])),
          oldPassword: new FormControl('', this.checkOldPass),
          confirmPassword: new FormControl('')
        });
  });
  }
  validationPasswordEdit = {
    accountPassword: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {type: 'minlength', message: 'Mật khẩu không ít hơn 4 ký tự.'},
      {type: 'maxlength', message: 'Mật khẩu không vượt quá 30 ký tự.'},
      {type: 'pattern', message: 'Mật khẩu chỉ được nhập chữ cái in hoa, chữ cái và số.'}
    ],
    confirmPassword: [
      {type: 'checkPass', message: 'Xác nhận mật khẩu phải giống mật khẩu mới.'}
    ],
    oldPassword: [
      {type: 'checkOldPass', message: 'Mật khẩu cũ chưa đúng. Vui lòng nhập lại.'}
    ]
  };
  checkOldPass(abstractControl: AbstractControl): any {
    const oldPass = abstractControl.value;
    console.log(oldPass);
    return oldPass === this.accountDto.accountPassword  ? null : {checkOldPass: true};
  }
  ngOnInit(): void {
  }

  submit() {
    this.editPasswordAccountDto = this.editPassAccountForm.value;
    this.accountService.editPassword(this.editPasswordAccountDto).subscribe(() => {
      this.matSnackBar.open("Thay đổi mật khẩu thành công", "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'green-snackbar'
      });
      console.log('ok');
      this.editPassAccountForm.reset();
    },
      error => {
        this.message = "Mật khẩu cũ chưa đúng. Vui lòng nhập lại.";
      });
  }
}
