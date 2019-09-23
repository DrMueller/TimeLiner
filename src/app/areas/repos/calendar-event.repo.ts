import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data';
import { WorkItem } from 'src/app/core/vss/data/models';

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
    return new CalendarEvent(wi.id, title!.value, deadline!.value, deadline!.value);
  }
}
