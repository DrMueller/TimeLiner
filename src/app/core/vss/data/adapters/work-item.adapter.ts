import { Injectable } from '@angular/core';
import * as nat from 'TFS/WorkItemTracking/Contracts';

import { WorkItem, WorkItemField } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemAdapter {
  public adapt(nativeWorkItem: nat.WorkItem): WorkItem {
    const fields = this.adaptFields(nativeWorkItem.fields);
    return new WorkItem(nativeWorkItem.id, fields);
  }

  private adaptFields(field: { [key: string]: any }): WorkItemField[] {
    const fieldKeys = Object.keys(field);
    const result = fieldKeys.map(fk => {
      const val = field[fk];
      return new WorkItemField(fk, val);
    });

    return result;
  }
}
