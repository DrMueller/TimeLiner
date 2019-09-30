import { Component, EventEmitter, Input, Output } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { WorkItemNavigationService } from 'src/app/core/vss/navigation/services';

import { SearchConfigurationDto } from '../../dtos';
import { CalendarEvent, DroppedCalendarEvent } from '../../models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public get isEditable(): boolean {
    return !!this.searchConfig && !!this.searchConfig.dateFieldName && !!this.searchConfig.queryId;
  }

  public buttonIcons = {
    prev: '',
    next: '',
    prevYear: '',
    nextYear: ''
  };

  public buttonText = {
    prev: '<',
    next: '>',
    prevYear: '<<',
    nextYear: '>>'
  };

  @Output() public calendarEventDropped = new EventEmitter<DroppedCalendarEvent>();

  public calendarPlugins = [
    dayGridPlugin,
    interactionPlugin
  ];

  @Input() public events: CalendarEvent[] = [];
  @Input() public searchConfig: SearchConfigurationDto;

  public constructor(
    private workItemNavigator: WorkItemNavigationService) { }

  public eventClicked(info: any): void {
    const eventId = parseInt(info.event.id, 10);
    this.workItemNavigator.navigateToEdit(eventId);
  }

  public async eventDropped(info: any): Promise<void> {
    const workItemId = parseInt(info.event.id, 10);
    const newDate = info.event.start;

    this.calendarEventDropped.emit(new DroppedCalendarEvent(workItemId, newDate));
  }
}
