import { IColDefBuilderService } from '..';
import { ColumnDefinitionsContainer } from '../../models';
import { IColDefBuilderOrchestratorService } from '../col-def-builder-orchestrator-service.interface';

import { ColDefBuilderService } from './col-def-builder.service';

export class ColDefBuilderOrchestratorService implements IColDefBuilderOrchestratorService {
  private _builders: ColDefBuilderService[];

  public  constructor() {
    this._builders = [];
  }

  public withColumn(columnKey: string, headerTranslationkey: string, className?: string): IColDefBuilderService {
    const colDefBuilder = new ColDefBuilderService(this, columnKey, headerTranslationkey, className);
    this._builders.push(colDefBuilder);
    return colDefBuilder;
  }

  public build(): ColumnDefinitionsContainer {
    const colDefs = this._builders.map(builder => builder.build());
    return new ColumnDefinitionsContainer(colDefs);
  }
}
