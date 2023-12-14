import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseLayoutService {

  abstract getMainMenus(): Promise<MenuItem[]>;
  async getProfileMenus(): Promise<MenuItem[]> {
    return []
  };
}

export interface MenuItem {
  text: string;
  link?: string;
  icon?: string;
  children?: MenuItem[];

  expanded?: boolean;
}
