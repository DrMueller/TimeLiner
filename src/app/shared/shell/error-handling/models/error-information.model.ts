export class ErrorInformation {
  constructor(
    public readonly errorName: string,
    public readonly errorMessage: string
  ) { }

  public static createEmpty(): ErrorInformation {
    return new ErrorInformation('', '');
  }
}
