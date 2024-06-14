import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {BreadcrumbComponent} from "./breadcrumb/index.component";
import {AuthDirective} from "./auth.directive";
import {LoadingComponent} from "./loading/index.component";

const COMPONENTS = [
  BreadcrumbComponent,
  LoadingComponent,
  AuthDirective
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
