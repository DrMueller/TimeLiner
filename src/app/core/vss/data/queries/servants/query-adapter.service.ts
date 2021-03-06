import { Injectable } from '@angular/core';
import * as nat from 'TFS/WorkItemTracking/Contracts';

import { Query } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryAdapterService {
  public adapt(nativeQuery: nat.QueryHierarchyItem): Query {
    const children = new Array<Query>();
    this.adaptRecursive(nativeQuery, children);

    const result = children[0];
    return result;
  }

  private adaptRecursive(nativeQuery: nat.QueryHierarchyItem, parentCollection: Query[]): void {
    const newChildren = new Array<Query>();
    const newQuery = new Query(
      nativeQuery.id,
      nativeQuery.name,
      nativeQuery.isFolder,
      nativeQuery.path,
      newChildren);

    parentCollection.push(newQuery);
    if (nativeQuery.children) {
      nativeQuery.children.forEach(nativeChild => this.adaptRecursive(nativeChild, newChildren));
    }
  }
}
