import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface UserInfo {
  name: string;
}

@Injectable({providedIn: 'root'})
export class PanelService {

  $userInfo = new BehaviorSubject<UserInfo | undefined>(undefined)
  $logout = new EventEmitter<void>()

  constructor() {
  }
}
