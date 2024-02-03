import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface UserInfo {
  name: string;
}

@Injectable({providedIn: 'root'})
export class PanelService {

  $accesses = new BehaviorSubject<string[]>([]);
  $userInfo = new BehaviorSubject<UserInfo | undefined>(undefined);
  $logout = new EventEmitter<void>();

  constructor() {
  }
}
