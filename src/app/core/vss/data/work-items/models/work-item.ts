import { WorkItemField } from '.';

export class WorkItem {
  public constructor(
    public readonly id: number,
    private readonly fields: WorkItemField[]) {
  }

  public findField(name: string): WorkItemField | undefined {
    return this.fields.find(f => f.name === name);
  }
}
