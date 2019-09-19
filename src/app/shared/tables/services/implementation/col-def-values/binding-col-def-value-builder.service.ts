import { BindingColumnDefinition, ColumnDefinitionBase } from '../../../models/col-defs/';

import { IColDefValueBuilderService } from '.';

export class BindingColDefValueBuilderService implements IColDefValueBuilderService {
  public constructor(
    private columnKey: string,
    private headerDescription: string,
    private propertyName: any,
    private className?: string) {
  }

  public build(): ColumnDefinitionBase {
    return new BindingColumnDefinition(
      this.columnKey,
      this.headerDescription,
      this.propertyName,
      this.className);
  }
}
