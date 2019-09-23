import { Component } from '@angular/core';

import { CalendarEvent, SearchConfiguration } from '../../models';
import { CalendarEventRepo } from '../../repos';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  public events: CalendarEvent[] = [];
  private _config: SearchConfiguration;

  public constructor(private eventRepo: CalendarEventRepo) {
  }

  public async dataRefreshRequested(): Promise<void> {
    this.events = await this.eventRepo.loadEventsAsync(this._config);
  }

  public searchConfigChanged(config: SearchConfiguration): void {
    this._config = config;
  }
}
