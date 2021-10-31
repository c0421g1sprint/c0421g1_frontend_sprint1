import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../../entity/IAccount";
import {IEditPasswordAccountDto} from '../../entity/IEditPassAccount';
import {IEditAccount} from '../../entity/iedit-account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL = 'http://localhost:8080/api/public/account';
  constructor(private http: HttpClient) {}

  findAll(): Observable<IAccount[]>{
    return this.http.get<IAccount[]>(this.baseURL);
  }

  editPassword(editPasswordAccountDto: IEditPasswordAccountDto): Observable<IEditPasswordAccountDto> {
    console.log(editPasswordAccountDto);
    return this.http.patch<IEditPasswordAccountDto>('http://localhost:8080/api/public/editPass', editPasswordAccountDto);
  }

  getAccountById(id: number): Observable<IEditAccount> {
    return this.http.get<IEditAccount>('http://localhost:8080/api/public/editPass/' + id);
  }
}
