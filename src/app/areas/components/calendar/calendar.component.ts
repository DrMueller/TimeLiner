import { Component, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { CalendarEvent } from '../../models';
import { WorkItemUrlFactory } from '../../repos/factories';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() public events: CalendarEvent[] = [];
  public calendarPlugins = [dayGridPlugin];

  public buttonText = {
    prev: '<',
    next: '>',
    prevYear: '<<',
    nextYear: '>>'
  };

  public buttonIcons = {
    prev: '',
    next: '',
    prevYear: '',
    nextYear: ''
  };

  public constructor(private urlFactory: WorkItemUrlFactory) { }

  public eventClicked(info: any) {
    console.log(info);
    // tslint:disable-next-line: no-debugger
    debugger;
    const eventId = parseInt(info.event.id, 10);
    const url = this.urlFactory.createEditUrl(eventId);
    window.open(url);
  }
}
