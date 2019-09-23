import { Injectable } from '@angular/core';
import * as nat from 'TFS/WorkItemTracking/Contracts';

import { Query } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryAdapter {
  public adapt(nativeQuery: nat.QueryHierarchyItem): Query {
    return new Query(nativeQuery.id, nativeQuery.name);
  }
}
