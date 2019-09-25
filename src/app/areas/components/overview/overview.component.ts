import { Component } from '@angular/core';

import { CalendarEvent, DroppedCalendarEvent, SearchConfiguration } from '../../models';
import { CalendarEventRepo } from '../../repos';
import { EventDataService } from '../../services';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  public events: CalendarEvent[] = [];
  public searchConfig: SearchConfiguration;

  public constructor(
    private eventRepo: CalendarEventRepo,
    private dataService: EventDataService) {
  }

  public async refreshData(): Promise<void> {
    if (this.searchConfig && this.searchConfig.isValid) {
      this.events = await this.eventRepo.loadEventsAsync(this.searchConfig);
    }
  }

  public async calendarEventDropped(droppedEvent: DroppedCalendarEvent): Promise<void> {
    // tslint:disable-next-line: no-debugger
    debugger;
    await this.dataService.updateWorkItemWithNewDateAsync(
      droppedEvent.workItemId,
      this.searchConfig.dateFieldName,
      droppedEvent.newDate);
  }

  public async searchConfigChanged(config: SearchConfiguration): Promise<void> {
    this.searchConfig = config;
    await this.refreshData();
  }
}
