import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {BreadcrumbComponent} from "./breadcrumb/index.component";

const COMPONENTS = [
  BreadcrumbComponent
]

@NgModule({
  imports: [DorbitModule],
  exports: [
    DorbitModule,
    ...COMPONENTS,
  ],
  declarations: [...COMPONENTS],
})
export class PanelSharedModule {
}
