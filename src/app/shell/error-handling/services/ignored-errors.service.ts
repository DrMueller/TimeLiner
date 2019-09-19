import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IgnoredErrorsService {
  public isIgnoredError(error: Error): boolean {
    const result = this.isIgnoredRoutingError(error);
    return result;
  }

  private isIgnoredRoutingError(error: Error): boolean {
    const signInCallbackError = 'Cannot match any routes. URL Segment: \'id_token\'';
    if (error.message.indexOf(signInCallbackError) > -1) {
      return true;
    }

    return false;
  }
}
