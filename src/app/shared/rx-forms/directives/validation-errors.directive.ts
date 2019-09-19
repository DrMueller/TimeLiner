import { Directive, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RxFormControlValidationService } from '../services';

@Directive({
  selector: '[appValidationErrors]'
})
export class ValidationErrorsDirective {
  private _formControlToValidate: FormControl;

  public constructor(
    private vcRef: ViewContainerRef,
    private renderer: Renderer2,
    private validator: RxFormControlValidationService) {
  }

  @Input() public set appValidationErrors(formControl: FormControl) {
    this._formControlToValidate = formControl;
    this._formControlToValidate.statusChanges.subscribe(validity => this.validate(validity));
  }

  private validate(validity: string): void {
    this.vcRef.element.nativeElement.innerHTML = '';

    if (validity !== 'VALID') {
      const validationErrors = this.validator.validateFormControl(this._formControlToValidate);
      const firstError = validationErrors[0]; // Material Best practices: Only show one error at a time
      const label = <HTMLElement>this.renderer.createElement('label');
      label.innerText = firstError.errorMessage;
      this.vcRef.element.nativeElement.appendChild(label);
    }
  }
}
