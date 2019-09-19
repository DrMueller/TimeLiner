import { Injectable } from '@angular/core';

import { IColDefBuilderOrchestratorService } from '.';
import { ColDefBuilderOrchestratorService } from './implementation/col-def-builder-orchestrator.service';

@Injectable({
  providedIn: 'root'
})
export class ColDefBuilderFactoryService {
  public startBuilding(): IColDefBuilderOrchestratorService {
    return new ColDefBuilderOrchestratorService();
  }
}
