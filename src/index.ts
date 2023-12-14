import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./pages/index.component";
import {CommonModule} from "@angular/common";
import {DorbitModule} from "@framework";

export * from './components'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DorbitModule,
  ],
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
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
