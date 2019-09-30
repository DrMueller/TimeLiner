/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { HttpClientFactoryService } from '../../common';
import { WorkItemTypeAdapterService } from '../data-modeling/adapters';
import { WorkItemType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemTypeRepositoryService {
  public constructor(
    private httpClientFactory: HttpClientFactoryService,
    private adapter: WorkItemTypeAdapterService) {
  }

  public async loadByProjectAsync(projectId: string): Promise<WorkItemType[]> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    const nativeTypes = await client.getWorkItemTypes(projectId);
    const types = nativeTypes.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    return types;
  }
}
