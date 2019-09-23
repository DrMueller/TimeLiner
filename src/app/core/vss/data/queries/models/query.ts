export class Query {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isFolder: boolean,
    public readonly path: string,
    public readonly children: Query[]) {
  }
}
