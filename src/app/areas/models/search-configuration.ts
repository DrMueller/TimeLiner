export class SearchConfiguration {
  public constructor(public readonly queryId: string, public dateFieldName: string) {
  }

  public get isValid(): boolean {
    return !!this.queryId && !!this.dateFieldName;
  }
}
