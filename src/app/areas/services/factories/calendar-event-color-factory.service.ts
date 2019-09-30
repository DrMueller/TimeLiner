import { Injectable } from '@angular/core';
import { ColorService } from 'src/app/core/colors/services';
import { VssWebContextFactoryService } from 'src/app/core/vss/contexts/web/services';
import { WorkItemType } from 'src/app/core/vss/data/work-items/models';
import { WorkItemTypeRepositoryService } from 'src/app/core/vss/data/work-items/repos';

import { CalendarEventColors } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventColorFactoryService {
  public constructor(
    private workItemTypeRepo: WorkItemTypeRepositoryService,
    private webContextFactory: VssWebContextFactoryService,
    private colorService: ColorService) { }

  public async createAllColorsAsync(): Promise<CalendarEventColors[]> {
    const projectId = this.webContextFactory.create().project.id;
    const workItemTypes = await this.workItemTypeRepo.loadByProjectAsync(projectId);
    const result = workItemTypes.map(wit => this.mapColor(wit));
    return result;
  }

  private mapColor(wit: WorkItemType): CalendarEventColors {
    const typeColor = '#' + wit.color;
    let textColor: string;
    const typeColorIsLight = this.colorService.checkIfColorIsLight(typeColor);
    if (typeColorIsLight) {
      textColor = '#000000';
    } else {
      textColor = '#ffffff';
    }

    return new CalendarEventColors(wit.name, textColor, typeColor);
  }
}
