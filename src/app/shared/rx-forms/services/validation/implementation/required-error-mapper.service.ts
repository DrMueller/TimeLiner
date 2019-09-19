import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationError, ValidationErrorMappingResult } from '../../../models';
import { IValidationErrorMapperService } from '../validation-error-mapper-service.interface';

@Injectable({
  providedIn: 'root'
})
export class RequiredErrorMapperService implements IValidationErrorMapperService {
  private readonly errorKey: string = 'required';

  public constructor(private translator: TranslateService) {
  }

  public map(errorKey: string, _: any): ValidationErrorMappingResult {

    if (errorKey !== this.errorKey) {
      return ValidationErrorMappingResult.createNonSuccess();
    }

    const message = this.translator
      .instant('shared.rx-forms.services.validation.implementation.validation-error-required');
    return new ValidationErrorMappingResult(true, new ValidationError(this.errorKey, message));
  }
}
