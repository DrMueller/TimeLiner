export class VssExtensionContext {
  public constructor(
    public readonly publisherId: string,
    public readonly extensionId: string,
    public readonly version: string,
    public readonly baseUri: string) { }
}
