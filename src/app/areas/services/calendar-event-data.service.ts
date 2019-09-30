import { Injectable } from '@angular/core';
import { WorkItem } from 'src/app/core/vss/data/work-items/models';
import { WorkItemRepositoryService } from 'src/app/core/vss/data/work-items/repos';
import { FunctionResult } from 'src/app/utils/types';

import { SearchConfigurationDto } from '../dtos';
import { CalendarEvent, CalendarEventColors } from '../models';

import { CalendarEventColorFactoryService } from './factories';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventDataService {
  public constructor(
    private workItemRepo: WorkItemRepositoryService,
    private colorFactory: CalendarEventColorFactoryService) {
  }

  public async searchEventsAsync(searchConfig: SearchConfigurationDto): Promise<CalendarEvent[]> {
    const workItems = await this.workItemRepo.loadByQueryAsync(searchConfig.queryId);
    if (workItems.length === 0) {
      return new Array<CalendarEvent>();
    }

    const typeColors = await this.colorFactory.createAllColorsAsync();
    const calendarEvents = workItems
      .map(wi => this.tryToMap(wi, searchConfig.dateFieldName, typeColors))
      .filter(eventResult => eventResult.isSuccess)
      .map(eventResult => eventResult.result!);

    return calendarEvents;
  }

  public async updateWorkItemWithNewDateAsync(workItemId: number, dateFieldName: string, date: Date): Promise<void> {
    const workItem = await this.workItemRepo.loadByIdAsync(workItemId);
    workItem.updateField(dateFieldName, date);
    await this.workItemRepo.updateAsync(workItem);
  }

  private tryToMap(
    wi: WorkItem,
    dateFieldName: string,
    colors: CalendarEventColors[]): FunctionResult<CalendarEvent> {
    const dateField = wi.findField(dateFieldName);
    if (!dateField.isSuccess) {
      return FunctionResult.createFailure<CalendarEvent>();
    }

    const dateStr = <string>dateField.result!.value;
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    const typeColor = colors.find(f => f.workItemTypeName === wi.workItemTypeDescription)!;

    const calendarEvent = new CalendarEvent(
      wi.id.toString(),
      wi.title,
      date,
      true,
      typeColor.backgroundColor,
      undefined,
      typeColor.textColor);

    return FunctionResult.createSuccess(calendarEvent);
  }
}
