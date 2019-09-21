import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/services';

import { CalendarEvent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {

  public constructor(private workItemRepo: WorkItemRepo) {
  }

  public async loadAllEventsAsync(): Promise<CalendarEvent[]> {
    const workItems = await this.workItemRepo.loadAllAsync('tra');
    const calendarEvents = workItems.map(wi => new CalendarEvent(wi.title, wi.date!, wi.date!));
    return calendarEvents;
  }
}
