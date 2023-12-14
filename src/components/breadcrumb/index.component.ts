import {Component} from '@angular/core';
import {BaseComponent} from "@dorbit";

@Component({
  selector: 'app-panel-breadcrumb',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})

export class BreadcrumbComponent extends BaseComponent {
  urls: string[] = [];

  override ngOnInit() {
    super.ngOnInit();

    this.urls = ['project.name'];
    this.urls.push(...this.router.url.split('/').filter(x => !!x).map(x => 'route.' + x));
    console.log(this.urls)
  }
}
