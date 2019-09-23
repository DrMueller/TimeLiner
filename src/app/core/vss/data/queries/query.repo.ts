import { Injectable } from '@angular/core';

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
    const nativeQueries = await client.getQueries(projectId, 3, 2, false);
    const queries = nativeQueries.map(nativeQuery => this.adapter.adapt(nativeQuery));
    return queries;
  }
}
