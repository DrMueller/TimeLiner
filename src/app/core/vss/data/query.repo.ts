/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { QueryAdapter } from './adapters/query.adapter';
import { ProxyFactory } from './factories/proxy.factory';
import { Query } from './models';

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
    const nativeQueries = await client.getQueries(projectId);
    const queries = nativeQueries.map(nativeQuery => this.adapter.adapt(nativeQuery));
    return queries;
  }
}
