import { ValidationError } from './validation-error.model';

export class ValidationErrorMappingResult {
  public constructor(public isSuccess: boolean, public validationError: ValidationError | null) {
  }

  public static createNonSuccess(): ValidationErrorMappingResult {
    return new ValidationErrorMappingResult(false, null);
  }
}
