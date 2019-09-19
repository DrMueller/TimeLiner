import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ValidationErrorMappingResult } from '../../../models/validation-error-mapping-result.model';
import { ValidationError } from '../../../models/validation-error.model';
import { IValidationErrorMapperService } from '../validation-error-mapper-service.interface';

@Injectable({
  providedIn: 'root'
})
export class MinLengthErrorMapperService implements IValidationErrorMapperService {
  private readonly errorKey: string = 'minlength';

  public constructor(private translator: TranslateService) {
  }

  public map(errorKey: string, error: any): ValidationErrorMappingResult {
    if (errorKey !== this.errorKey) {
      return ValidationErrorMappingResult.createNonSuccess();
    }

    const message = this
      .translator.instant('shared.rx-forms.services.validation.implementation.validation-error-minlength', {
        requiredLength: error.requiredLength,
        actualLength: error.actualLength
      });

    return new ValidationErrorMappingResult(true, new ValidationError(this.errorKey, message));
  }
}
