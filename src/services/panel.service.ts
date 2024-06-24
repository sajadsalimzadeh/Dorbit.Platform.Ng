import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface UserInfo {
  id: string;
  name: string;
}

@Injectable({providedIn: 'root'})
export class PanelService {

  $loading = new BehaviorSubject<boolean>(false);
  $accesses = new BehaviorSubject<string[]>([]);
  $userInfo = new BehaviorSubject<UserInfo | undefined>(undefined);
  $logout = new EventEmitter<void>();

  constructor() {
  }
}
