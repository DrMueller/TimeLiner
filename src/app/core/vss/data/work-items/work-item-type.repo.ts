/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { ProxyFactory } from '../common';

import { WorkItemType } from './models';
import { WorkItemTypeAdapter } from './servants/work-item-type.adapter';

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
    // tslint:disable-next-line: no-debugger
    debugger;
    const nativeTypes = await client.getWorkItemTypes(projectId);
    // tslint:disable-next-line: no-debugger
    debugger;

    const types = nativeTypes.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    return types;
  }
}
