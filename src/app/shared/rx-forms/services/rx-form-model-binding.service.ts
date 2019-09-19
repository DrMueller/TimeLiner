import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RxFormGroupBindingService {
  public bindToModel(formGroup: FormGroup, model: any) {
    const controlKeys = Object.keys(formGroup.controls);

    controlKeys.forEach(ck => {
      model[ck] = <any>formGroup.controls[ck].value;
    });
  }

  public bindToFormGroup(model: any, formGroup: FormGroup) {
    const modelKeys = Object.keys(model);

    modelKeys.forEach(mk => {
      const control = formGroup.controls[mk];

      if (control) {
        control.setValue(model[mk]);
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
  }
}
