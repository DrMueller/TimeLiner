import { TemplateRef } from '@angular/core';

import { ColumnDefinitionBase } from './column-definition-base.model';

export class TemplateColumnDefinition extends ColumnDefinitionBase {
  public constructor(
    headerKey: string,
    headerDescription: string,
    public readonly template: TemplateRef<any>,
    className?: string
  ) {
    super(headerKey, headerDescription, className);
  }
}
