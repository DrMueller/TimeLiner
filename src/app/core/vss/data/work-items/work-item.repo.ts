/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

import { ProxyFactory } from '../common';

import { WorkItem } from './models';
import { WorkItemAdapter } from './servants';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public constructor(
    private proxyFactory: ProxyFactory,
    private adapter: WorkItemAdapter) {
  }

  public async loadByIdsAsync(...ids: number[]): Promise<WorkItem[]> {
    const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    return this.loadAndMapWorkItemsAsync(client, ids);
  }

  public async loadByQueryAsync(queryId: string): Promise<WorkItem[]> {
    const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    const queryResult = await client.queryById(queryId);
    const workItemIds = queryResult.workItems.map(wi => wi.id);
    return this.loadAndMapWorkItemsAsync(client, workItemIds);
  }

  private async loadAndMapWorkItemsAsync(client: WorkItemTrackingHttpClient, ids: number[]): Promise<WorkItem[]> {
    if (ids.length === 0) {
      return new Array<WorkItem>();
    }

    const nativeWorkItems = await client.getWorkItems(ids);
    const workItems = nativeWorkItems.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    return workItems;
  }
}
