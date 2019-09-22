/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItem } from 'TFS/WorkItemTracking/Contracts';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

import * as m from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAsync(ids: number[]): Promise<m.WorkItem[]> {
    return new Promise((resolve: (value?: m.WorkItem[]) => void, _: any) => {
      VSS.require(['TFS/WorkItemTracking/RestClient'], (wit: any) => {
        const client = <WorkItemTrackingHttpClient> wit.getClient();
        client.getWorkItems(ids).then((workItems: WorkItem[]) => {
          workItems.fields;
        });

        resolve([]);
      });
    });
  }
}
