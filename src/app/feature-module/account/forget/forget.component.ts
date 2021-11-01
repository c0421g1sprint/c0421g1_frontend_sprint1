import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../core-module/account/login.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  email: string ;
  loading = false;

  constructor(private loginService: LoginService, private snackbar: SnackbarService, private route: Router) { }

  ngOnInit(): void {
  }

  sendEmail(items ) {
    console.log(items.email);
    this.loading = true;
    this.loginService.getPassword(items.email).subscribe(
      next => {
        this.loading = false;
        this.route.navigateByUrl("/login");
        this.snackbar.showSnackbar("Mật khẩu đã được gửi về email cho bạn", "success");
      }, error => {
        this.loading = false;
        this.snackbar.showSnackbar("Không tìm thấy email này", "error");
      }
    )
  }
}
