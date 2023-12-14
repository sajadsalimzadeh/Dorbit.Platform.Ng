import {NgModule} from '@angular/core';
import {DorbitModule} from "@dorbit";
import {BreadcrumbComponent} from "./breadcrumb/index.component";
import {TranslateModule} from "@ngx-translate/core";

const COMPONENTS = [
  BreadcrumbComponent
]

@NgModule({
  imports: [DorbitModule, TranslateModule],
  exports: [
    ...COMPONENTS,
    TranslateModule,
  ],
  declarations: [...COMPONENTS],
  providers: [],
})
export class PanelSharedModule {
}
