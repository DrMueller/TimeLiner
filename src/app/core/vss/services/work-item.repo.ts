/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { CommonMethods4To5 } from 'TFS/WorkItemTracking/RestClient';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): Promise<WorkItem[]> {
    return new Promise((resolve: (value?: WorkItem[]) => void, _: any) => {
      VSS.require(['VSS/Service', 'TFS/WorkItemTracking/RestClient'], async (VSS_Service: any, TFS_Wit_WebApi: any) => {
        // tslint:disable-next-line: no-debugger
        debugger;
        const witClient = <CommonMethods4To5>VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
        const nativeWorkItems = await witClient.getWorkItems([424, 1074]);

        const workItems = nativeWorkItems.map(nw => new WorkItem(nw.id, nw.fields['title'], nw.fields['date']));
        resolve(workItems);
      });

      console.log(dateFieldName);
      // return [
      //   new WorkItem(1, 'title  1', new Date(Date.now())),
      //   new WorkItem(2, 'title  2', new Date(Date.now())),
      //   new WorkItem(3, 'title  3', new Date(Date.now()))
      // ];
    });
  }
}
