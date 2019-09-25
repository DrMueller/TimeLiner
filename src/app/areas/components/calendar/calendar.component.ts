import { Component, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { WorkItemNavigationService } from 'src/app/core/vss/navigation/services';

import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
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

  public constructor(private workItemNavigator: WorkItemNavigationService) { }

  public eventClicked(info: any) {
    const eventId = parseInt(info.event.id, 10);
    this.workItemNavigator.navigateToEdit(eventId);
  }
}
