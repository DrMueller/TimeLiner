import { WorkItemField } from '../models';

export class WorkItem {
  public constructor(
    public readonly id: number,
    public readonly fields: WorkItemField[]) {
  }
}
