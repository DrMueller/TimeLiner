import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items';
import { WorkItem } from 'src/app/core/vss/data/work-items/models';

import { CalendarEvent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {

  public constructor(private workItemRepo: WorkItemRepo) {
  }

  public async loadAllEventsAsync(): Promise<CalendarEvent[]> {
    const workItems = await this.workItemRepo.loadByIdsAsync(1043);
    const calendarEvents = workItems.map(wi => this.map(wi));
    return calendarEvents;
  }

  private map(wi: WorkItem): CalendarEvent {
    const title = wi.findField('System.Title');
    const deadline = wi.findField('Custom.Deadline');
    // tslint:disable-next-line: no-debugger
    debugger;

    const date = <string>deadline!.value;
    const beginDate = new Date(date);
    beginDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(25, 59, 59, 999);

    return new CalendarEvent(wi.id, title!.value, beginDate, endDate);
  }
}
