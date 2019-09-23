/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { QueryExpand } from 'TFS/WorkItemTracking/Contracts';

import { ProxyFactory } from '../common';

import { Query } from './models';
import { QueryAdapter } from './servants/query.adapter';

@Injectable({
  providedIn: 'root'
})

// https://docs.microsoft.com/de-de/azure/devops/extend/reference/client/api/tfs/workitemtracking
// /restclient/workitemtrackinghttpclient2_1?view=azure-devops#method_getQueries
export class QueryRepo {
  public constructor(
    private proxyFactory: ProxyFactory,
    private adapter: QueryAdapter) {
  }

  public async loadByProjectAsync(projectId: string): Promise<Query[]> {
    const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    const nativeQueries = await client.getQueries(projectId, QueryExpand.All);
    // tslint:disable-next-line: no-debugger
    debugger;
    const queries = nativeQueries.map(nativeQuery => this.adapter.adapt(nativeQuery));
    return queries;
  }
}
