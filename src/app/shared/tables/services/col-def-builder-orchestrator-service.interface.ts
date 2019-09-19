import { ColumnDefinitionsContainer } from '../models';

import { IColDefBuilderService } from '.';

export interface IColDefBuilderOrchestratorService {
  withColumn(columnKey: string, headerTranslationKey: string, className?: string): IColDefBuilderService;
  build(): ColumnDefinitionsContainer;
}
