import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../core-module/account/storage.service";
import {LinkService} from "../../core-module/account/link.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string[] = [];

  constructor(private router: Router, private storage: StorageService, private linkService: LinkService) {
  }

  ngOnInit(): void {
    this.linkService.getReloadComponent().subscribe(() => {
      if (this.storage.getToken()) {
        this.username = this.storage.getUsernameFromSession();
        this.role = this.storage.getRole();
      }
    })
  }

  getOut() {
    window.sessionStorage.clear();
    this.username = '';
    this.role = [];
   this.router.navigateByUrl("/login");
  }
}
