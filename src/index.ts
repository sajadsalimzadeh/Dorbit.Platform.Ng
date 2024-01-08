import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {DorbitModule} from "@framework";
import {LayoutAdminComponent} from "./components/layouts/admin/index.component";
import {LayoutMobileComponent} from "./components/layouts/mobile/index.component";

export * from './components';
export * from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DorbitModule,
  ],
  exports: [LayoutAdminComponent, LayoutMobileComponent],
  declarations: [LayoutAdminComponent, LayoutMobileComponent],
  providers: [],
})
export class PanelModule {

  static forRoot(): ModuleWithProviders<PanelModule> {
    return {
      ngModule: PanelModule,
      providers: [
      ]
    }
  }
}
