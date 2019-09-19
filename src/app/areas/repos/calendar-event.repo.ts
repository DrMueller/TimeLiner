import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/services';

import { CalendarEvent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventRepo {

  public constructor(private workItemRepo: WorkItemRepo) {
  }

  public loadAllEvents(): Promise<CalendarEvent[]> {
    // const mock = [
    //   new CalendarEvent('Event 1', new Date(2019, 9, 8), new Date(2019, 9, 8))
    // ];

    const data = this
      .workItemRepo
      .loadAll('tra')
      .map(wi => new CalendarEvent(wi.title, wi.date!, wi.date!));

    return Promise.resolve(data);
  }
}
