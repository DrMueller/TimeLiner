/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

@Injectable({
  providedIn: 'root'
})
export class HttpClientFactoryService {
  public createForWorkItemTrackingAsync(): Promise<WorkItemTrackingHttpClient> {
    return new Promise((resolve: any, _: any) => {
      VSS.require(['TFS/WorkItemTracking/RestClient'], (wit: any) => {
        const client = <WorkItemTrackingHttpClient>wit.getClient();
        return resolve(client);
      });
    });
  }
}
