import { ColumnDefinitionBase } from '../../../models/col-defs';

export interface IColDefValueBuilderService {
  build(): ColumnDefinitionBase;
}
