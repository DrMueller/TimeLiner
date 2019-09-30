import { Injectable } from '@angular/core';

import { VssExtensionContext } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VssExtensionContextFactoryService {
  public create(): VssExtensionContext {
    if (typeof VSS === 'undefined') {
      return new VssExtensionContext(
        'DrMueller123',
        '123',
        '1.3.3.7',
        'tra'
      );
    }

    const nativeContext = VSS.getExtensionContext();
    return new VssExtensionContext(
      nativeContext.publisherId,
      nativeContext.extensionId,
      nativeContext.version,
      nativeContext.baseUri);
  }
}
