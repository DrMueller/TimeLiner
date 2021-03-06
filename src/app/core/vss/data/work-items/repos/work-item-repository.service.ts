/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

import { HttpClientFactoryService } from '../../common';
import { WorkItemAdapterService } from '../data-modeling/adapters/work-item-adapter.service';
import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemRepositoryService {
  public constructor(
    private httpClientFactory: HttpClientFactoryService,
    private adapter: WorkItemAdapterService) {
  }

  public async loadByIdAsync(id: number): Promise<WorkItem> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    const workItems = await this.loadAndMapWorkItemsAsync(client, id);
    return workItems[0];
  }

  public async loadByIdsAsync(ids: number[]): Promise<WorkItem[]> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    return await this.loadAndMapWorkItemsAsync(client, ...ids);
  }

  public async loadByQueryAsync(queryId: string): Promise<WorkItem[]> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    const queryResult = await client.queryById(queryId);
    const workItemIds = queryResult.workItems.map(wi => wi.id);
    return await this.loadAndMapWorkItemsAsync(client, ...workItemIds);
  }

  public async updateAsync(workItem: WorkItem): Promise<void> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    const patchDocuments = this.adapter.adaptToPatchDocuments(workItem);

    if (patchDocuments.length === 0) {
      return;
    }

    await client.updateWorkItem(patchDocuments, workItem.id);
  }

  private async loadAndMapWorkItemsAsync(client: WorkItemTrackingHttpClient, ...ids: number[]): Promise<WorkItem[]> {
    if (ids.length === 0) {
      return new Array<WorkItem>();
    }

    const nativeWorkItems = await client.getWorkItems(ids);
    const workItems = nativeWorkItems.map(nativeWorkItem => this.adapter.adaptToModel(nativeWorkItem));
    return workItems;
  }
}
