import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/services';

import { SearchConfiguration } from '../../models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public set workItemDateFieldName(value: string) {
    this._workItemDateFieldName = value;
    this.emitChange();

    if (this._timerId) {
      window.clearTimeout(this._timerId);
    }

    this._timerId = window.setTimeout(() => {
      this.persistWorkItemDateFieldName();
    }, 500);
  }

  public get canRefresh(): boolean {
    return !!this._workItemDateFieldName && !!this._queryId;
  }

  public get workItemDateFieldName(): string {
    return this._workItemDateFieldName;
  }

  @Output() public searchConfigChanged = new EventEmitter<SearchConfiguration>();
  @Output() public dataRefreshRequested = new EventEmitter();

  private readonly _dateFieldKey = 'DateFieldKey';
  private _timerId: number | undefined;
  private _workItemDateFieldName: string;
  private _queryId: string;

  public constructor(
    private localStorage: LocalStorageService) { }

  public ngOnInit(): void {
    this.workItemDateFieldName = this.localStorage.load(this._dateFieldKey) || '';
  }

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

  private persistWorkItemDateFieldName(): void {
    this.localStorage.save(this._dateFieldKey, this._workItemDateFieldName);
  }
}
