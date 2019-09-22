/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): Promise<WorkItem[]> {
    console.log(dateFieldName);
    return new Promise((resolve: (value?: WorkItem[]) => void, _: any) => {
      VSS.require(['TFS/WorkItemTracking/RestClient'], (wit: any) => {
        // tslint:disable-next-line: no-debugger
        debugger;
        const client = wit.getClient();
        client.getWorkItem(424).then((workItem: any) => {
          console.log(workItem);
        });

        resolve([]);
      });
    });
  }
}
