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

  private adaptFields(fields: any): WorkItemField[] {
    // tslint:disable-next-line: no-debugger
    debugger;
    const result = fields.map((field: any) => new WorkItemField(field.name, null));
    return result;
  }
}
