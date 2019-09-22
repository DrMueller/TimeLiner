/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItem } from 'TFS/WorkItemTracking/Contracts';

import * as m from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): Promise<m.WorkItem[]> {
    console.log(dateFieldName);
    return new Promise((resolve: (value?: m.WorkItem[]) => void, _: any) => {
      VSS.require(['TFS/WorkItemTracking/RestClient'], (wit: any) => {
        const client = wit.getClient();
        client.getWorkItem(424).then((workItem: WorkItem) => {
          console.log(workItem);
        });

        resolve([]);
      });
    });
  }
}
