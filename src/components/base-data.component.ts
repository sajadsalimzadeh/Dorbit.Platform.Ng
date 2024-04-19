import {Directive, Injector, Type} from '@angular/core';
import {BaseWriteRepository, ODataQueryOptions, PagedListResult} from "@framework";
import {BaseDataViewComponent} from "./base-data-view.component";
import {Observable} from "rxjs";

@Directive()
export abstract class BaseDataComponent extends BaseDataViewComponent {

  constructor(injector: Injector, protected repository: BaseWriteRepository) {
    super(injector);
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    return this.repository.select(query);
  }

  remove(item: any) {
    const dialog = this.dialogService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      buttons: [
        {
          color: 'success', text: 'بله', action: (btn) => {
            btn.loading = true;
            this.repository.remove(item.id).subscribe({
              next: () => {
                btn.loading = false;
                this.load();
                dialog.close();
              },
              error: () => {
                btn.loading = false;
              }
            });
          }
        },
        {
          color: 'danger', text: 'خیر', action: () => {
            dialog.close();
          }
        },
      ]
    }, {
      title: 'حذف'
    })
  }
}
