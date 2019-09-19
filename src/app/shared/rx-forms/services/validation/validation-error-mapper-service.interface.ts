import { ValidationErrorMappingResult } from '../../models/validation-error-mapping-result.model';

export interface IValidationErrorMapperService {
  map(errorKey: string, error: any): ValidationErrorMappingResult;
}
