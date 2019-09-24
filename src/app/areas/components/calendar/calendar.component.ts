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

  public buttonIcons = {
    prev: '',
    next: '',
    prevYear: '',
    nextYear: ''
  };

  public eventClicked(info: any) {
    console.log(info);
    // const eventUrl = info.event.url;
    // window.open(eventUrl);
  }
}
