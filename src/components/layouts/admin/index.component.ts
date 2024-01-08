import {Component, Inject, Injector, NgZone} from '@angular/core';
import {BaseComponent} from "@framework";
import {BaseLayoutService, MenuItem} from "../../../services/base-layout.service";
import {AuthRepository} from "@identity";
import {PanelService, UserInfo} from "../../../services/panel.service";
import moment from "jalali-moment";

@Component({
  selector: 'panel-layout-admin',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})

export class LayoutAdminComponent extends BaseComponent {

  mainMenus: MenuItem[] = [];
  profileMenus: MenuItem[] = [];
  timeInterval: any;

  userInfo?: UserInfo;

  constructor(
    injector: Injector,
    private readonly zone: NgZone,
    private panelService: PanelService,
    private authRepository: AuthRepository,
    @Inject(BaseLayoutService) private baseLayoutServices: BaseLayoutService[]) {
    super(injector);
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.subscription.add(this.panelService.$userInfo.subscribe(e => {
      this.userInfo = e;
    }))

    this.zone.runOutsideAngular(() => {
      const updateTime = () => {
        const toolbarEl = this.elementRef.nativeElement.querySelector('aside>.toolbar');
        if (toolbarEl) {
          const m = moment().locale('fa');
          toolbarEl.querySelector('.date')!.innerHTML = m.format('YYYY/MM/DD');
          toolbarEl.querySelector('.hour')!.innerHTML = m.format('HH');
          toolbarEl.querySelector('.min')!.innerHTML = m.format('mm');
          toolbarEl.querySelector('.sec')!.innerHTML = m.format('ss');
        }
      };
      this.timeInterval = setInterval(() => updateTime(), 1000);
      updateTime();
    });

    this.mainMenus = [];
    this.profileMenus = [];
    for (const baseLayoutService of this.baseLayoutServices.sort(x => x.order)) {
      this.mainMenus.push(...await baseLayoutService.getMainMenus());
      this.profileMenus.push(...await baseLayoutService.getProfileMenus())
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    clearInterval(this.timeInterval);
  }

  toggleMenu(item: MenuItem, items: MenuItem[]) {
    const status = !item.expanded;
    items.forEach(x => x.expanded = false);
    item.expanded = status;
  }

  logout() {
    this.authRepository.logout().subscribe(() => {
      this.router.navigate(['/auth'])
    })
  }
}
