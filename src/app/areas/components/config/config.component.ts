import { Component, EventEmitter, Output } from '@angular/core';

import { SearchConfiguration } from '../../models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  public set workItemDateFieldName(value: string) {
    // tslint:disable-next-line: no-debugger
    debugger;
    this._workItemDateFieldName = value;
    this.emitChange();
  }

  public get workItemDateFieldName(): string {
    return this._workItemDateFieldName;
  }

  @Output() public searchConfigChanged = new EventEmitter<SearchConfiguration>();
  @Output() public dataRefreshRequested = new EventEmitter();

  private _workItemDateFieldName: string;
  private _queryId: string;

  public selectedQueryIdChanged(queryId: string): void {
    this._queryId = queryId;
    this.emitChange();
  }

  public refresh(): void {
    this.dataRefreshRequested.emit();
  }

  private emitChange(): void {
    this.searchConfigChanged.emit(new SearchConfiguration(this._queryId, this._workItemDateFieldName));
  }

}
