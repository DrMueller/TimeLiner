import { Injectable } from '@angular/core';

import { HttpClientFactoryService } from '../common';

import { Query } from './models';
import { QueryAdapterService } from './servants';

@Injectable({
  providedIn: 'root'
})
export class QueryRepositoryService {
  public constructor(
    private httpClientFactory: HttpClientFactoryService,
    private adapter: QueryAdapterService) {
  }

  public async loadByProjectAsync(projectId: string): Promise<Query[]> {
    const client = await this.httpClientFactory.createForWorkItemTrackingAsync();
    const nativeQueries = await client.getQueries(projectId, 4, 2, false);
    const queries = nativeQueries.map(nativeQuery => this.adapter.adapt(nativeQuery));
    return queries;
  }
}
