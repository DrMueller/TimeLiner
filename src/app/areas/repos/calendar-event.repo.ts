import { Injectable } from '@angular/core';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items';
import { WorkItem, WorkItemType } from 'src/app/core/vss/data/work-items/models';
import { WorkItemTypeRepo } from 'src/app/core/vss/data/work-items/work-item-type.repo';

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
    const calendarEvents = workItems.map(wi => this.map(wi, searchConfig.dateFieldName, workItemTypes));
    return calendarEvents;
  }

  private map(
    wi: WorkItem,
    dateFieldName: string,
    workItemTypes: WorkItemType[]): CalendarEvent {
    const title = wi.findField('System.Title');
    const deadline = wi.findField(dateFieldName);
    // tslint:disable-next-line: no-debugger
    debugger;

    const dateStr = <string>deadline!.value;
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const workItemType = wi.findField('System.WorkItemType');
    const type = workItemTypes.find(f => f.name === workItemType!.value);

    return new CalendarEvent(wi.id, title!.value, date, true, type!.color);
  }

  private loadWorkItemTypesAsync(): Promise<WorkItemType[]> {
    const projectId = this.vssWebContextFactory.create().project.id;
    return this.workItemTypeRepo.loadByProjectAsync(projectId);
  }
}
