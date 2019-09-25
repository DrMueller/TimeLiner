import { Injectable } from '@angular/core';
import * as nat from 'TFS/WorkItemTracking/Contracts';

import { WorkItem, WorkItemField } from '../../models';
import { JsonPatchDocument, Operation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemAdapter {
  public adaptToModel(nativeWorkItem: nat.WorkItem): WorkItem {
    const fields = this.adaptFields(nativeWorkItem.fields);
    return new WorkItem(nativeWorkItem.id, fields);
  }

  public adaptToPatchDocuments(workItem: WorkItem): JsonPatchDocument[] {
    const result = workItem.getDirtyFields().map(field =>
      new JsonPatchDocument(
        Operation.Add,
        `/fields/${field.name}`,
        field.value));

    return result;
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
