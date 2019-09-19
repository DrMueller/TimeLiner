export abstract class ColumnDefinitionBase {
  constructor(
    public readonly columnKey: string,
    public readonly headerTranslationKey: string,
    public readonly className?: string
  ) { }
}
