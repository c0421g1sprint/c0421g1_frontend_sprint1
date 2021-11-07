import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IEditAccount} from "../entity/iedit-account";
import {IEditPasswordAccountDto} from "../entity/IEditPassAccount";
import {AccountService} from "../../../core-module/account/account.service";
import {LinkService} from "../../../core-module/account/link.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('accountPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  editPassAccountForm: FormGroup = new FormGroup({
    accountId: new FormControl(),
    accountPassword: new FormControl('' ,Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')])),
    oldPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  }, {validators: this.checkPasswords})


  id: number;
  message: string;
  accountDto: IEditAccount;
  accountUsername: string;
  editPasswordAccountDto: IEditPasswordAccountDto;


  constructor(private activedRouter: ActivatedRoute ,
              private accountService: AccountService,
              private matSnackBar: SnackbarService, private linkService: LinkService, private router: Router) {
      activedRouter.paramMap.subscribe((paramMap: ParamMap) => {
        this.accountUsername = paramMap.get('accountUsername');
        console.log(this.accountUsername + "Hau o day");
        this.accountService.getAccountByUsername(this.accountUsername).subscribe(next => {
          this.accountDto = next;
          console.log(this.accountDto);
          this.id = this.accountDto.accountId;
          console.log(this.id);
        });
  });
  }
  validationPasswordEdit = {
    accountPassword: [
      {type: 'required', message: 'Mật khẩu không được để trống.'},
      {type: 'minlength', message: 'Mật khẩu không ít hơn 4 ký tự.'},
      {type: 'maxlength', message: 'Mật khẩu không vượt quá 30 ký tự.'},
      {type: 'pattern', message: 'Mật khẩu chỉ được nhập chữ cái in hoa, chữ cái và số.'}
    ]
  };


  ngOnInit(): void {
  }

  submit() {
    this.editPassAccountForm.patchValue({accountId: this.id});
    this.editPasswordAccountDto = this.editPassAccountForm.value;
    this.accountService.editPassword(this.editPasswordAccountDto).subscribe(() => {
      this.matSnackBar.showSnackbar("Thay đổi mật khẩu thành công", "success");
      this.editPassAccountForm.reset();
        window.sessionStorage.clear();
      this.linkService.reloadComponent();
      this.router.navigateByUrl("");
    },
      error => {
        this.matSnackBar.showSnackbar("Mật khẩu cũ chưa đúng. Vui lòng nhập lại.", "error");
      });
  }

  backHome() {
    this.router.navigateByUrl("");
  }
}
