import {Directive, EventEmitter, Injector, Input, Output, Type} from '@angular/core';
import {BasePanelComponent} from "./base-panel.component";
import {FormGroup} from "@angular/forms";
import {BaseWriteRepository} from "@framework";

@Directive()
export abstract class BaseFormComponent extends BasePanelComponent {
  @Input({required: true}) model: any;

  @Output() onComplete = new EventEmitter<any>();

  protected abstract form: FormGroup;

  constructor(injector: Injector, protected repository: BaseWriteRepository) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    if(this.model) {
      this.form.patchValue(this.model);
      this.form.get('id')?.enable();
    } else {
      this.form.get('id')?.disable();
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstFocusEl = this.elementRef.nativeElement.querySelector('form .ng-invalid[tabindex], form .ng-invalid [tabindex]') as HTMLElement;
      if (firstFocusEl) firstFocusEl.focus()
      this.form.markAsDirty()
      this.messageService.warn('مقادیر وارد شده صحیح نمیباشد')
      return;
    }
    const value = this.form.value;
    if (!value.id) {
      delete value.id;
      this.subscription.add(this.repository.add(value).subscribe(res => {
        this.onComplete.emit();
      }));
    } else {
      this.subscription.add(this.repository.edit(value.id, value).subscribe(res => {
        this.onComplete.emit();
      }));
    }
  }
}
