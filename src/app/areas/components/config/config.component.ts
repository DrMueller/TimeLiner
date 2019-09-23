import { Component, EventEmitter, Output } from '@angular/core';
import { Query } from 'src/app/core/vss/data/queries/models';

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
  private _query: Query;

  public set workTemDateFieldName(value: string) {
    this._workItemDateFieldName = value;
    this.omitChange();
  }

  public selectedQueryChanged(query: Query): void {
    this._query = query;
    this.omitChange();
  }

  private omitChange(): void {
    this.searchConfigChanged.emit(new SearchConfiguration(this._query.id, this._workItemDateFieldName));
  }
}
