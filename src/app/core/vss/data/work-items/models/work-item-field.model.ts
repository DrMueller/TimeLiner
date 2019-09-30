export class WorkItemField {
  public get value(): any {
    return this._value;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  private _isDirty = false;

  public constructor(
    public readonly name: string,
    private _value: any) { }

  public updateValue(newValue: any): void {
    if (this._value === newValue) {
      return;
    }

    this._value = newValue;
    this._isDirty = true;
  }
}
