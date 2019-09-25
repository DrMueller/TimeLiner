/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { ProxyFactory } from '../../common';
import { WorkItemTypeAdapter } from '../data-modeling/adapters';

import { WorkItemType } from './models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemTypeRepo {
  public constructor(
    private proxyFactory: ProxyFactory,
    private adapter: WorkItemTypeAdapter) {
  }

  public async loadByProjectAsync(projectId: string): Promise<WorkItemType[]> {
    const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    const nativeTypes = await client.getWorkItemTypes(projectId);
    const types = nativeTypes.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    return types;
  }
}
