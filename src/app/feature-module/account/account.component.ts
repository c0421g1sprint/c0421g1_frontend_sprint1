import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../core-module/account/login.service';
import {StorageService} from '../../core-module/account/storage.service';
import {LinkService} from "../../core-module/account/link.service";
import {SnackbarService} from "../../core-module/snackbar/snackbar.service";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  role: string[] = [];
  saveInfo: boolean = false;
  loginForm: FormGroup =new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(30)])),
    password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(30)]))
  });


  constructor(private loginService: LoginService, private router: Router,
              private storageService: StorageService, private linkService: LinkService,
              private snackBar: SnackbarService) {

    // //Kiet login 26/10:  Fill vao form group neu username da luu vao local storage
    if (this.storageService.getUsernameFromLocal() != null) {
      this.loginForm.patchValue({username: this.storageService.getUsernameFromLocal()});
      this.loginForm.patchValue({password: this.storageService.getPassword()});
      this.saveInfo = !this.saveInfo;
    }
  }

  ngOnInit(): void {}


//Kiet login 26/10: Luu mat khau va tai khoan luc dang nhap
  onLogin() {
    if (this.saveInfo){
      this.storageService.saveUsernameLocal(this.loginForm.get('username').value);
      this.storageService.savePasswordLocal(this.loginForm.get('password').value)
    }else {
      window.localStorage.clear();
    }
    if (this.loginForm.valid){
      this.loginService.getLogin(this.loginForm.value).subscribe(
        next => {
          this.storageService.saveTokenSession(next.token);
          this.storageService.saveRolesSession(next.roles);
          this.storageService.saveUsernameSession(next.username);
          console.log(next);
          this.snackBar.showSnackbar("Chào mừng đến với website C0421G1", "success");
          this.router.navigateByUrl("");
          this.linkService.reloadComponent();
        },
        error => {
         this.snackBar.showSnackbar("Wrong password or username", "error")
        })
    }else {
      this.snackBar.showSnackbar("Username and password must enter", "error");
    }
  }

  rememberMe(checked: boolean) {
    this.saveInfo  = !this.saveInfo
  }

  validationMessage = {
    username:[
      {type: "required", message: "Bắt buộc nhập."},
      {type: "minlength", message: "Tên đăng nhập tối thiểu 6 ký tự."},
      {type: "maxlength", message: "Tên đăng nhập không vượt quá 30 ký tự."}
    ],
    password: [
      {type: "required", message: "Bắt buộc nhập."},
      {type: "minlength", message: "Mật khẩu tối thiểu 6 ký tự."},
      {type: "maxlength", message: "Mật khẩu  không vượt quá 30 ký tự."}
    ],
  }

}
