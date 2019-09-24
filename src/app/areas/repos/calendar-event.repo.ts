import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items';
import { WorkItem } from 'src/app/core/vss/data/work-items/models';
import { FunctionResult } from 'src/app/utils/types';

import { CalendarEvent, CalendarEventColors, SearchConfiguration } from '../models';

import { CalendarEventColorFactory, WorkItemUrlFactory } from './factories';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {
  public constructor(
    private workItemRepo: WorkItemRepo,
    private workItemUrlFactory: WorkItemUrlFactory,
    private colorFactory: CalendarEventColorFactory) {
  }

  public async loadEventsAsync(searchConfig: SearchConfiguration): Promise<CalendarEvent[]> {
    const workItems = await this.workItemRepo.loadByQueryAsync(searchConfig.queryId);
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

    const title = wi.findField('System.Title').result;
    const dateStr = <string>dateField.result!.value;
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const workItemType = wi.findField('System.WorkItemType').result;
    const typeColor = colors.find(f => f.workItemTypeName === workItemType!.value)!;
    const editUrl = this.workItemUrlFactory.createEditUrl(wi.id);

    const calendarEvent = new CalendarEvent(
      title!.value,
      editUrl,
      date,
      true,
      typeColor.backgroundColor,
      undefined,
      typeColor.textColor);

    return FunctionResult.createSuccess(calendarEvent);
  }

}
