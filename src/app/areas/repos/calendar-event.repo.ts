import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items';
import { WorkItem } from 'src/app/core/vss/data/work-items/models';
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

    console.log(1);
    const workItems = await this.workItemRepo.loadByQueryAsync(searchConfig.queryId);
    console.log(2);

    if (workItems.length === 0) {
      return new Array<CalendarEvent>();
    }

    console.log(3);

    const typeColors = await this.colorFactory.createAllColorsAsync();
    console.log(4);

    const calendarEvents = workItems
      .map(wi => this.tryToMap(wi, searchConfig.dateFieldName, typeColors))
      .filter(eventResult => eventResult.isSuccess)
      .map(eventResult => eventResult.result!);
    console.log(5);

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
