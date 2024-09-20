import {Component, ContentChildren, Injector, Input, QueryList, TemplateRef} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";
import {BaseComponent, internetStateService, TemplateDirective} from "@framework";
import {MenuItem} from "../../services/base-layout.service";
import {AuthService, UserDto} from "@identity";

@Component({
  selector: 'panel-layout-mobile',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class LayoutMobileComponent extends BaseComponent {

  @Input({required: true}) menus: MenuItem[] = [];

  headerStartStartTpl?: TemplateRef<any>;
  headerStartEndTpl?: TemplateRef<any>;
  headerEndStartTpl?: TemplateRef<any>;
  headerEndEndTpl?: TemplateRef<any>;

  @ContentChildren(TemplateDirective) set templates(templates: QueryList<TemplateDirective>) {
    this.headerStartStartTpl = templates.find(x => x.name == 'header-start-start')?.template;
    this.headerStartEndTpl = templates.find(x => x.name == 'header-start-end')?.template;
    this.headerEndStartTpl = templates.find(x => x.name == 'header-end-start')?.template;
    this.headerEndEndTpl = templates.find(x => x.name == 'header-end-end')?.template;
  }

  show: any = {};
  notificationCount: number = 0;

  signal: number = 4;
  selectedMenu?: MenuItem;

  user?: UserDto;

  constructor(injector: Injector, private authService: AuthService) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const path = this.elementRef.nativeElement.querySelector('#footer-clip-path path') as SVGPathElement;
    if (path) {
      const w = .6;
      const h = 0.75;
      const start = .5 - (w / 2);
      const end = .5 + (w / 2);
      const step = w / 4;
      path.setAttribute('d', `M0,0 L${start} 0,
      Q${.5 - step} 0,${.5 - step} ${h / 2},Q${.5 - step * .8} ${h},0.5 ${h},
      Q${.5 + step * .8} ${h},${.5 + step} ${h / 2},Q${.5 + step} 0,${end} 0,
      L1 0,1 1,0 1`);
    }

    this.subscription.add(this.router.events.subscribe(data => {
      this.processRouteData();
    }))

    this.subscription.add(this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.processSelectedMenu(e.url);
      }
    }));

    this.processSelectedMenu(this.router.url);

    this.subscription.add(this.authService.$user.subscribe(e => {
      this.user = e;
    }))
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  processRouteData() {
    this.show = {};
    let route = this.route.firstChild;
    while (route) {
      const shows = route?.snapshot?.data['show'] ?? route?.parent?.snapshot?.data['show'] ?? [];
      shows.forEach((x: string) => {
        this.show[x] = true;
      });
      const queryParams = route?.snapshot.queryParams ?? route?.parent?.snapshot.queryParams ?? {};
      if(queryParams['header'] == 'hide') this.show.header = false;
      if(queryParams['footer'] == 'hide') this.show.footer = false;
      route = route.parent;
    }
  }

  processSelectedMenu(url: string) {
    this.selectedMenu = this.menus.find(x => url == x.link);
  }

  async reload() {
    return internetStateService.reload();
  }
}
