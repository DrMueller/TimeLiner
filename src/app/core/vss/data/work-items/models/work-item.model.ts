import * as _ from 'lodash';
import { FunctionResult } from 'src/app/utils/types';

import { WorkItemField } from '.';

export class WorkItem {

  public get workItemTypeDescription(): string {
    return this.findField('System.WorkItemType').result!.value;
  }

  public constructor(
    public readonly id: number,
    private readonly fields: WorkItemField[]) {
  }

  public findField(name: string): FunctionResult<WorkItemField> {
    const field = this.fields.find(f => f.name === name);
    if (!field) {
      return FunctionResult.createFailure<WorkItemField>();
    }

    const fieldCopy = _.cloneDeep(field);
    return FunctionResult.createSuccess(fieldCopy);
  }

  public getDirtyFields(): WorkItemField[] {
    return this.fields.filter(f => f.isDirty);
  }

  public updateField(name: string, newValue: any): void {
    const field = this.fields.find(f => f.name === name);
    if (field) {
      field.updateValue(newValue);
    }
  }

  // HelloWorld Test
  public get title(): string {
    return this.findField('System.Title').result!.value;
  }
}
