import {Directive, Injector, Type} from '@angular/core';
import {BaseWriteRepository} from "@framework";
import {BaseDataViewComponent} from "./base-data-view.component";

@Directive()
export abstract class BaseDataComponent extends BaseDataViewComponent {

  constructor(injector: Injector, protected repository: BaseWriteRepository) {
    super(injector);
  }

  remove(item: any) {
    const dialog = this.dialogService.confirm({
      text: 'آیا از حذف این ردیف اطمینان دارید؟',
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
