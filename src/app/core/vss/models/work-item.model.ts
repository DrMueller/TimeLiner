export class WorkItem {
  public constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly date?: Date) {
  }
}
