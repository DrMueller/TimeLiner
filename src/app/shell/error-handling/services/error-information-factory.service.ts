import { Injectable } from '@angular/core';

import { ErrorInformation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ErrorInformationFactoryService {
  public createFromError(error: Error): ErrorInformation {
    const errorMessage = error.message || 'Unknown';
    const errorName = error.name;
    const result = new ErrorInformation(errorName, errorMessage);
    return result;
  }
}
