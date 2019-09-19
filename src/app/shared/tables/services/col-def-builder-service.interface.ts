import { TemplateRef } from '@angular/core';

import { IColDefBuilderOrchestratorService } from '.';

export interface IColDefBuilderService {
  bindingTo<T>(propertyName: keyof T): IColDefBuilderOrchestratorService;
  withTemplate(template: TemplateRef<any>): IColDefBuilderOrchestratorService;
}
