import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorUnwrappingService {
  public unwrapError(error: any): Error {
    if (error.hasOwnProperty('rejection')) {
      error = error.rejection;
    }

    if (error.hasOwnProperty('status') && error.status === 0) {
      return new Error('Server not reachable.');
    }

    if (typeof error.json === 'function') {
      error = error.json();
    }

    if (error.hasOwnProperty('body')) {
      error = error.body;
    }

    while (error.hasOwnProperty('error') && !!error.error) {
      error = error.error;
      // If it is a Error from the ErrorHandlingMiddleware on the Server, we create a client version of it here.
      error = this.createFromServerError(error);
    }

    return error;
  }

  private createFromServerError(error: any): any {
    if (error.hasOwnProperty('Message') && error.hasOwnProperty('StackTrace') && error.hasOwnProperty('TypeName')) {
      const err = new Error(error.Message);
      err.stack = error.StackTrace;
      err.name = error.TypeName;

      return err;
    }

    return error;
  }
}
