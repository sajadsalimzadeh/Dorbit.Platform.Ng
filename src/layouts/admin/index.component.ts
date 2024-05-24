import {Component, Inject, Injector, NgZone, Optional} from '@angular/core';
import {APP_VERSION, BaseComponent} from "@framework";
import {BaseLayoutService, MenuItem} from "../../services/base-layout.service";
import {PanelService, UserInfo} from "../../services/panel.service";
import moment from "jalali-moment";
import {panelStore} from "../../stores";

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
  theme = panelStore.store.theme;

  constructor(
    injector: Injector,
    private readonly zone: NgZone,
    private panelService: PanelService,
    @Inject(BaseLayoutService) private baseLayoutServices: BaseLayoutService[],
    @Inject(APP_VERSION) @Optional() protected version?: () => string,) {
    super(injector);
  }

  override async ngOnInit() {
    super.ngOnInit();

    this.subscription.add(this.panelService.$userInfo.subscribe(e => {
      this.userInfo = e;
    }));

    this.subscription.add(panelStore.on('theme').subscribe(e => {
      this.theme = e.theme;
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
    this.mainMenus = this.mainMenus.sort((x1, x2) => {
      x1.order ??= 0;
      x2.order ??= 0;
      return (x1.order > x2.order ? 1 : (x1.order < x2.order ? -1 : 0))
    });
    this.mainMenus.forEach(x => {
      if (!x.accesses && x.children) {
        const accesses: string[] = [];
        x.children.forEach(c => {
          if (c.accesses) accesses.push(...c.accesses)
        });
        x.accesses = accesses;
      }
    });
    this.profileMenus.push({
      icon: 'fal fa-palette', text: 'تغییر قالب', action: () => {
        panelStore.set('theme', panelStore.store.theme === 'default-light' ? 'default-dark' : 'default-light');
      }
    })
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    clearInterval(this.timeInterval);
  }

  toggleMenu(item: MenuItem, items: MenuItem[]) {
    const status = !item.expanded;
    items.forEach(x => x.expanded = false);
    item.expanded = status;
    if (item.action) item.action(item);
  }

  async logout() {
    this.panelService.$logout.emit();
    await this.router.navigate(['/auth'])
  }
}
