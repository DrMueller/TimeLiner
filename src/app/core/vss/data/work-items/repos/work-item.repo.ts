/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

import { ProxyFactory } from '../../common';
import { WorkItemAdapter } from '../data-modeling/adapters';
import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public constructor(
    private proxyFactory: ProxyFactory,
    private adapter: WorkItemAdapter) {
  }

  public async updateWorkItemAsync(workItem: WorkItem): Promise<void> {
    const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    const patchDocuments = this.adapter.adaptToPatchDocuments(workItem);
    // tslint:disable-next-line: no-debugger
    debugger;

    if (patchDocuments.length === 0) {
      return;
    }

    await client.updateWorkItem(patchDocuments, workItem.id);
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
    const workItems = nativeWorkItems.map(nativeWorkItem => this.adapter.adaptToModel(nativeWorkItem));
    return workItems;
  }
}
