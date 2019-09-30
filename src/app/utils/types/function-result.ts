export class FunctionResult<T> {
  private constructor(public readonly isSuccess: boolean, public readonly result: T | undefined) { }

  public static createFailure<T>(): FunctionResult<T> {
    return new FunctionResult<T>(false, undefined);
  }

  public static createSuccess<T>(result: T): FunctionResult<T> {
    return new FunctionResult(true, result);
  }
}
