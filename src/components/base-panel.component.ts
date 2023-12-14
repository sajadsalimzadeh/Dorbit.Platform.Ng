import {Directive, Injector, TemplateRef} from '@angular/core';
import {BaseComponent, ConfirmOptions, DialogOptions, DialogService} from "@dorbit";

@Directive()
export abstract class BasePanelComponent extends BaseComponent {

  protected get dialogService(): DialogService {
    return this._services['DialogService'] ??= this.injector.get(DialogService);
  }

  protected messages = {
    formInvalid: () => this.messageService.warn(this.t('message.form-invalid')),
    success: () => this.messageService.success(this.t('message.success')),
    error: () => this.messageService.error(this.t('message.error')),
  }

  constructor(injector: Injector) {
    super(injector);
  }

  showDialog(template: TemplateRef<any>, options?: { title?: string, width?: string, context?: any }) {
    return this.dialogService.open({
      template: template,
      width: '500px',
      position: 'top-center',
      ...options,
    })
  }

  confirm(message?: string, dialogOptions?: DialogOptions) {

    return new Promise<ConfirmOptions>((resolve, reject) => {
      const options = {
        text: message ?? this.t('message.confirm.description'),
        buttons: [
          {
            text: this.t('yes'), color: 'success', action: () => {
              dialog.close();
              resolve(options);

            }
          },
          {
            text: this.t('no'), color: 'danger', action: () => {
              dialog.close();
              reject();
            }
          },
        ]
      } as ConfirmOptions;
      const dialog = this.dialogService.confirm(options, {
        width: '500px',
        position: 'top-center',
        title: this.t('message.confirm.title'),
        ...dialogOptions,
      })
    })
  }
}
