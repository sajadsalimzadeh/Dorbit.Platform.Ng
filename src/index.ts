import {ModuleWithProviders, NgModule} from '@angular/core';
import {LayoutAdminComponent} from "./layouts/admin/index.component";
import {LayoutMobileComponent} from "./layouts/mobile/index.component";
import {PanelSharedModule} from "./components";
import {Routes} from "@angular/router";

export * from './components';
export * from './services';

@NgModule({
  imports: [PanelSharedModule],
  exports: [PanelSharedModule, LayoutAdminComponent, LayoutMobileComponent],
  declarations: [LayoutAdminComponent, LayoutMobileComponent],
})
export class PanelModule {

  static forRoot(): ModuleWithProviders<PanelModule> {
    return {
      ngModule: PanelModule,
      providers: []
    }
  }
}
