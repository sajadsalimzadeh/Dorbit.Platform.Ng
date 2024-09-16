import {ModuleWithProviders, NgModule} from "@angular/core";
import {PanelSharedModule} from "./components";
import {LayoutAdminComponent} from "./layouts/admin/index.component";
import {LayoutMobileComponent} from "./layouts/mobile/index.component";

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
