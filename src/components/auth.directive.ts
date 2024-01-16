import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs";
import {PanelService} from "@panel";

@Directive({
  selector: '[auth]',
})
export class AuthDirective implements OnInit, OnDestroy {
  private hasView = false;
  private subscription = new Subscription();
  private accesses: string[] = [];
  private needleAccesses?: string[];

  @Input() set auth(value: string | string[] | undefined) {
    this.needleAccesses = (typeof value === 'string' ? [value?.toLowerCase()] : value?.map(x => x?.toLowerCase()));
    this.render();
  }

  constructor(
    private panelService: PanelService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(this.panelService.$accesses.subscribe(e => {
      this.accesses = e;
      this.render();
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  render() {
    let granted: boolean;
    if (this.needleAccesses) {
      granted = !this.needleAccesses.find(x => !this.accesses.includes(x))
    } else {
      granted = true;
    }
    if (granted && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!granted && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
