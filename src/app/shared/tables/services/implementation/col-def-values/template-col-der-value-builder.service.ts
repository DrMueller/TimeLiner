import { TemplateRef } from '@angular/core';

import { ColumnDefinitionBase, TemplateColumnDefinition } from '../../../models/col-defs';

import { IColDefValueBuilderService } from '.';

export class TemplateColDefValueBuilderService implements IColDefValueBuilderService {
  public constructor(
    private columnKey: string,
    private headerDescription: string,
    private templateRef: TemplateRef<any>,
    private className?: string) {
  }

  public build(): ColumnDefinitionBase {
    return new TemplateColumnDefinition(this.columnKey, this.headerDescription, this.templateRef, this.className);
  }
}
