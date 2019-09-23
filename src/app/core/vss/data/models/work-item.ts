import { WorkItemField } from '.';

export class WorkItem {
  public constructor(
    public readonly id: number,
    public readonly fields: WorkItemField[]) {
  }
}
