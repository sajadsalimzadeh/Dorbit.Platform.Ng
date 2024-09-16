import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {IndexComponent} from './index.component';
import {LogComponent} from "./logs/index.component";
import {DorbitModule} from "@framework";

@NgModule({
  imports: [
    DorbitModule,
    RouterModule.forChild([{path: '', component: IndexComponent}])
  ],
  declarations: [
    IndexComponent,
    LogComponent
  ]
})
export class PageJobModule {
}
