import { Component, EventEmitter, Output } from '@angular/core';

import { SearchConfiguration } from '../../models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  @Output() public searchConfigChanged = new EventEmitter<SearchConfiguration>();
  @Output() public dataRefreshRequested = new EventEmitter();

  private _workItemDateFieldName: string;
  private _queryId: string;

  public set workTemDateFieldName(value: string) {
    this._workItemDateFieldName = value;
    this.omitChange();
  }

  public selectedQueryIdChanged(queryId: string): void {
    this._queryId = queryId;
    this.omitChange();
  }

  private omitChange(): void {
    this.searchConfigChanged.emit(new SearchConfiguration(this._queryId, this._workItemDateFieldName));
  }
}
