import { Injectable } from '@angular/core';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items';
import { WorkItem, WorkItemType } from 'src/app/core/vss/data/work-items/models';
import { WorkItemTypeRepo } from 'src/app/core/vss/data/work-items/work-item-type.repo';
import { FunctionResult } from 'src/app/utils/types';

import { CalendarEvent, SearchConfiguration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {
  public constructor(
    private workItemRepo: WorkItemRepo,
    private workItemTypeRepo: WorkItemTypeRepo,
    private vssWebContextFactory: VssWebContextFactory) {
  }

  public async loadEventsAsync(searchConfig: SearchConfiguration): Promise<CalendarEvent[]> {
    const workItemTypes = await this.loadWorkItemTypesAsync();
    const workItems = await this.workItemRepo.loadByQueryAsync(searchConfig.queryId);
    const calendarEvents = workItems
      .map(wi => this.tryMapping(wi, searchConfig.dateFieldName, workItemTypes))
      .filter(eventResult => eventResult.isSuccess)
      .map(eventResult => eventResult.result!);

    return calendarEvents;
  }

  private tryMapping(
    wi: WorkItem,
    dateFieldName: string,
    workItemTypes: WorkItemType[]): FunctionResult<CalendarEvent> {
    const dateField = wi.findField(dateFieldName);
    if (!dateField.isSuccess) {
      return FunctionResult.createFailure<CalendarEvent>();
    }

    const title = wi.findField('System.Title').result;
    const dateStr = <string>dateField.result!.value;
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const workItemType = wi.findField('System.WorkItemType').result;
    const typeColor = '#' + workItemTypes.find(f => f.name === workItemType!.value)!.color;

    const calendarEvent = new CalendarEvent(
      wi.id,
      title!.value,
      date,
      true,
      typeColor);

    return FunctionResult.createSuccess(calendarEvent);
  }

  private loadWorkItemTypesAsync(): Promise<WorkItemType[]> {
    const projectId = this.vssWebContextFactory.create().project.id;
    return this.workItemTypeRepo.loadByProjectAsync(projectId);
  }
}
