import { Injectable } from '@angular/core';

import { Query } from './models';

@Injectable({
  providedIn: 'root'
})

// https://docs.microsoft.com/de-de/azure/devops/extend/reference/client/api/tfs/workitemtracking
// /restclient/workitemtrackinghttpclient2_1?view=azure-devops#method_getQueries
export class QueryRepo {
  // public constructor(
  //   private proxyFactory: ProxyFactory,
  //   private adapter: QueryAdapter) {
  // }

  public async loadByProjectAsync(_: string): Promise<Query[]> {

    const subQueries = [
      new Query('4', 'Sub 1', false, 'tra', []),
      new Query('5', 'Sub 2', false, 'tra2', []),
      new Query('6', 'Sub 3', false, 'tra3', []),
    ];

    const query1 = new Query('1', 'Main 1', true, 'tra', subQueries);
    const query2 = new Query('2', 'Main 2', true, 'tra', subQueries);

    return [
      query1,
      query2
    ];

    // const client = await this.proxyFactory.createWorkItemTrackingClientAsync();
    // const nativeQueries = await client.getQueries(projectId, 4, 2, false);
    // const queries = nativeQueries.map(nativeQuery => this.adapter.adapt(nativeQuery));
    // return queries;
  }
}
