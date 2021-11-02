import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private behaviorSubject = new Subject();


  reloadComponent() {
    this.behaviorSubject.next();
  }

  getReloadComponent(){
    return this.behaviorSubject.asObservable();
  }

  constructor() { }


}
