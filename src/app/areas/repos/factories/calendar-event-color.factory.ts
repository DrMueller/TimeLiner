import { Injectable } from '@angular/core';
import { ColorService } from 'src/app/core/colors/services';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services';
import { WorkItemTypeRepo } from 'src/app/core/vss/data/work-items';
import { WorkItemType } from 'src/app/core/vss/data/work-items/models';

import { CalendarEventColors } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventColorFactory {

  public constructor(
    private workItemTypeRepo: WorkItemTypeRepo,
    private webContextFactory: VssWebContextFactory,
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
