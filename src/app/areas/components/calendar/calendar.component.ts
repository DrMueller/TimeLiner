import { Component, EventEmitter, Input, Output } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { WorkItemNavigationService } from 'src/app/core/vss/navigation/services';

import { CalendarEvent, DroppedCalendarEvent } from '../../models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Output() public calendarEventDropped = new EventEmitter<DroppedCalendarEvent>();

  @Input() public events: CalendarEvent[] = [];
  public calendarPlugins = [
    dayGridPlugin,
    interactionPlugin
  ];

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

  public constructor(
    private workItemNavigator: WorkItemNavigationService) { }

  public eventClicked(info: any) {
    const eventId = parseInt(info.event.id, 10);
    this.workItemNavigator.navigateToEdit(eventId);
  }

  public async eventDropped(info: any): Promise<void> {
    // tslint:disable-next-line: no-debugger
    debugger;
    const eventId = info.event.id;
    console.log(eventId);
  }
}
