import {Directive, Injector, TemplateRef, Type} from '@angular/core';
import {BasePanelComponent} from "./base-panel.component";
import {DialogOptions, DialogRef, ODataQueryOptions, PagedListResult, TableConfig, TableData} from "@framework";
import {Observable, Subscription} from "rxjs";

@Directive()
export abstract class BaseDataViewComponent extends BasePanelComponent {
  data: TableData = {items: [], totalCount: 0};
  config = new TableConfig();

  loadSubscription = new Subscription();

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.load();
  }

  protected abstract loader(query: ODataQueryOptions): Observable<PagedListResult>;

  protected load() {
    this.loadSubscription.unsubscribe();
    this.loadSubscription = this.loader(new ODataQueryOptions()).subscribe(res => {
      this.data = {
        items: res.data ?? [],
        totalCount: res.totalCount ?? res.data?.length ?? 0,
      }
    })
  }

  override showDialog(template: TemplateRef<any>, options?: { title?: string; width?: string, context?: any }): DialogRef {
    const dialog = super.showDialog(template, options);
    dialog.onClose.subscribe(() => {
      this.load();
    })
    return dialog;
  }

  showDialogByComponent(component: Type<any>, options?: DialogOptions) {
    this.dialogService.open({
      ...options,
      component: component
    })
  }
}
