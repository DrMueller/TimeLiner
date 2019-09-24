/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { WorkItemType } from './models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemTypeRepo {
  // public constructor(
  //   private proxyFactory: ProxyFactory,
  //   private adapter: WorkItemTypeAdapter) {
  // }

  public async loadByProjectAsync(_: string): Promise<WorkItemType[]> {
    return Promise.resolve([]);
    // const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    // const nativeTypes = await client.getWorkItemTypes(projectId);
    // const types = nativeTypes.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    // return types;
  }
}
