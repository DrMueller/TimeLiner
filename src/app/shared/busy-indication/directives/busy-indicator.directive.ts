import { ComponentFactoryResolver, ComponentRef, Directive, Injector, Input, ViewContainerRef } from '@angular/core';

import { BusyIndicatorComponent } from '../components/busy-indicator';

@Directive({
  selector: '[appBusyIndicator]'
})
export class BusyIndicatorDirective {
  private _busyIndicatorComponent: ComponentRef<BusyIndicatorComponent>;

  public constructor(
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(BusyIndicatorComponent);
    this._busyIndicatorComponent = factory.create(injector);
    this._busyIndicatorComponent.instance.showIndicator = false;
    this.vcRef.insert(this._busyIndicatorComponent.hostView);
  }

  @Input()
  public set appBusyIndicator(isBusy: boolean) {
    this._busyIndicatorComponent.instance.showIndicator = isBusy;
  }
}
