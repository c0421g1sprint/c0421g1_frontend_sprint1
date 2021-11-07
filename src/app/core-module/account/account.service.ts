import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IEditPasswordAccountDto} from "../../feature-module/account/entity/IEditPassAccount";
import {IEditAccount} from "../../feature-module/account/entity/iedit-account";
import {IAccount} from "../../entity/IAccount";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

   // HauPT do editPassword function
  editPassword(editPasswordAccountDto: IEditPasswordAccountDto): Observable<IEditPasswordAccountDto> {
    console.log(editPasswordAccountDto);
    return this.http.patch<IEditPasswordAccountDto>('http://localhost:8080/api/public/editPass', editPasswordAccountDto);
  }
  // HauPT do getAccountByUsername function
  getAccountByUsername(accountUsername: string): Observable<IEditAccount> {
    return this.http.get<IEditAccount>('http://localhost:8080/api/public/editPass?accountUsername=' + accountUsername);
  }

  private baseURL = 'http://localhost:8080/api/public';
  addNewAccount(account: IAccount,id:number): Observable<any>{
    return this.http.post(this.baseURL + '/add/'+id, account);
  }
}
