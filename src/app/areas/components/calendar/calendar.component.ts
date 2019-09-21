import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from '../../models';
import { CalendarEventRepo } from '../../repos';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public events: CalendarEvent[] = [];

  public constructor(private eventRepo: CalendarEventRepo) { }

  public ngOnInit(): void {
    this.eventRepo.loadAllEvents().then(ev => this.events = ev);
  }

}
