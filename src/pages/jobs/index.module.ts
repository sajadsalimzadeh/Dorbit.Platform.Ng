import {NgModule} from '@angular/core';

import {IndexComponent} from './index.component';
import {PanelSharedModule} from "@panel";
import {RouterModule} from "@angular/router";
import {LogComponent} from "./logs/index.component";

@NgModule({
  imports: [PanelSharedModule, RouterModule.forChild([{path: '', component: IndexComponent}])],
  declarations: [IndexComponent, LogComponent],
  exports: [],
  providers: [],
})
export class IndexModule {
}
