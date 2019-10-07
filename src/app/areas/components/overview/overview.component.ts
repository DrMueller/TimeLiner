import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BusyIndicatorService } from 'src/app/core/loading-indication/services';
import { SnackBarService } from 'src/app/core/snack-bar/services';

import { SearchConfigurationDto } from '../../dtos';
import { CalendarEvent, DroppedCalendarEvent } from '../../models';
import { CalendarEventDataService } from '../../services/calendar-event-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  public get showLoadingIndicator$(): Observable<boolean> {
    return this.busyIndicator.showBusyIndicator$;
  }

  public events: CalendarEvent[] = [];
  public searchConfig: SearchConfigurationDto;

  public constructor(
    private calendarEventDataService: CalendarEventDataService,
    private busyIndicator: BusyIndicatorService,
    private snackbarService: SnackBarService) {
  }

  public async calendarEventDropped(droppedEvent: DroppedCalendarEvent): Promise<void> {
    await this.busyIndicator.withBusyIndicator(async () => {
      await this.calendarEventDataService.updateWorkItemWithNewDateAsync(
        droppedEvent.workItemId,
        this.searchConfig.dateFieldName,
        droppedEvent.newDate);
    });

    this.snackbarService.showSnackBar(`Work Item ${droppedEvent.workItemId} saved`);
  }

  public async refreshData(): Promise<void> {
    console.log(`refreshData ${JSON.stringify(this.searchConfig)}`);
    if (this.searchConfig && this.searchConfig.dateFieldName && this.searchConfig.queryId) {
      await this.busyIndicator.withBusyIndicator(async () => {
        this.events = await this.calendarEventDataService.searchEventsAsync(this.searchConfig);
      });

      this.snackbarService.showSnackBar('Data loaded');
    }
  }

  public async searchConfigChanged(config: SearchConfigurationDto): Promise<void> {
    console.log(`searchConfigChanged change ${JSON.stringify(config)}`);
    setTimeout(async () => {
      this.searchConfig = config;
    });
  }
}
