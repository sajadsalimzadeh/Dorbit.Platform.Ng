import {ModuleWithProviders, NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {LayoutAdminComponent} from "./components/layouts/admin/index.component";
import {LayoutMobileComponent} from "./components/layouts/mobile/index.component";

export * from './components';
export * from './services';

@NgModule({
  imports: [DorbitModule],
  exports: [DorbitModule, LayoutAdminComponent, LayoutMobileComponent],
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
