import { Injectable } from '@angular/core';

import { WorkItemAdapter } from './adapters';
import { ProxyFactory } from './factories/proxy.factory';
import { WorkItem } from './models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public constructor(
    private proxyFactory: ProxyFactory,
    private adapter: WorkItemAdapter) {
  }

  public async loadByIdAsync(...ids: number[]): Promise<WorkItem[]> {
    const client = await this.proxyFactory.createWorkItemClientAsync();
    const nativeWorkItems = await client.getWorkItems(ids);
    const workItems = nativeWorkItems.map(nativeWorkItem => this.adapter.adapt(nativeWorkItem));
    return workItems;
  }
}