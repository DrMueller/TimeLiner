import { FunctionResult } from 'src/app/utils/types';

import { WorkItemField } from '.';

export class WorkItem {
  public constructor(
    public readonly id: number,
    private readonly fields: WorkItemField[]) {
  }

  public findField(name: string): FunctionResult<WorkItemField> {
    const field = this.fields.find(f => f.name === name);
    if (!field) {
      return FunctionResult.createFailure<WorkItemField>();
    }

    return FunctionResult.createSuccess(field);
  }
}
