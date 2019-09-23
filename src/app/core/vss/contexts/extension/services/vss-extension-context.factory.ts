import { Injectable } from '@angular/core';

import { VssExtensionContext } from '../models';

@Injectable({
  providedIn: 'root'
})

export class VssExtensionContextFactory {
  public create(): VssExtensionContext {
    const nativeContext = VSS.getExtensionContext();
    return new VssExtensionContext(
      nativeContext.publisherId,
      nativeContext.extensionId,
      nativeContext.version,
      nativeContext.baseUri);
  }
}
