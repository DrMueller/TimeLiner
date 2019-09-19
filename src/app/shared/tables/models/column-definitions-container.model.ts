import { ColumnDefinitionBase } from './col-defs/column-definition-base.model';

export class ColumnDefinitionsContainer {
  public constructor(public readonly definitions: ColumnDefinitionBase[]) {
  }

  public get allColumnKeys(): string[] {
    return this.definitions.map(def => def.columnKey);
  }
}
