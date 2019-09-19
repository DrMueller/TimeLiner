export class ValidationError {
  public constructor(public readonly validatorKey: string, public readonly errorMessage: string) {
  }
}
