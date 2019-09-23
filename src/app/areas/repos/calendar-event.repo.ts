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
    const workItems = await this.workItemRepo.loadAsync(1, 2, 3);
    // const calendarEvents = workItems.map(wi => new CalendarEvent('tra', new Date(2019, 12, 29), new Date(2019, 12, 29));
    // return calendarEvents;

    console.log(workItems);
    return [];
  }
}
