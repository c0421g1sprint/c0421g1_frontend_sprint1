import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {
  constructor(private storage: StorageService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storage.getToken()){
      let role = this.storage.getRole();
      console.log(role.indexOf('ROLE_ADMIN'))
      if (role.indexOf('ROLE_ADMIN') != -1){
        return true;
      }
    }
    return false;
  }

}
