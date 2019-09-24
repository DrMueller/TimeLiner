import { Component, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() public events: CalendarEvent[] = [];
  public calendarPlugins = [dayGridPlugin];

  public eventClicked(info: any) {
    debugger;
    console.log(info);
  }
}
