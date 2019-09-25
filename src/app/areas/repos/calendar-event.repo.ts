import { Injectable } from '@angular/core';
import { WorkItem } from 'src/app/core/vss/data/work-items/models';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items/repos';
import { FunctionResult } from 'src/app/utils/types';

import { CalendarEvent, CalendarEventColors, SearchConfiguration } from '../models';

import { CalendarEventColorFactory } from './factories';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {
  public constructor(
    private workItemRepo: WorkItemRepo,
    private colorFactory: CalendarEventColorFactory) {
  }

  public async loadEventsAsync(searchConfig: SearchConfiguration): Promise<CalendarEvent[]> {
    if (!searchConfig.dateFieldName || !searchConfig.queryId) {
      return new Array<CalendarEvent>();
    }

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
