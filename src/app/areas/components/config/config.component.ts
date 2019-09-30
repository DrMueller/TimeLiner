import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VssWebContextFactoryService } from 'src/app/core/vss/contexts/web/services';
import { QueryRepositoryService } from 'src/app/core/vss/data/queries';
import { Query } from 'src/app/core/vss/data/queries/models';

import { SearchConfigurationDto } from '../../dtos';
import { SearchConfigurationStorageService } from '../../services/search-configuration-storage.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  @Output() public dataRefreshRequested = new EventEmitter();
  @Output() public searchConfigChanged = new EventEmitter<SearchConfigurationDto>();

  public queries: Query[];
  private _searchConfig: SearchConfigurationDto;
  private _timerId: number | undefined;

  public constructor(
    private searchConfigStorage: SearchConfigurationStorageService,
    private webContextFactory: VssWebContextFactoryService,
    private queryRepo: QueryRepositoryService) { }

  public async ngOnInit(): Promise<void> {
    await this.loadQueriesAsync();
    this._searchConfig = this.searchConfigStorage.load();
  }

  public get canRefresh(): boolean {
    return !!this._searchConfig.dateFieldName && !!this._searchConfig.queryId;
  }

  public refresh(): void {
    this.dataRefreshRequested.emit();
  }

  public get selectedQueryId(): string {
    return this._searchConfig.queryId;
  }

  public set selectedQueryId(value: string) {
    this._searchConfig.queryId = value;
    this.persistConfig();
    this.emitChange();
  }

  public get workItemDateFieldName(): string {
    return this._searchConfig.dateFieldName;
  }

  public set workItemDateFieldName(value: string) {
    this._searchConfig.dateFieldName = value;
    this.emitChange();

    if (this._timerId) {
      window.clearTimeout(this._timerId);
    }

    this._timerId = window.setTimeout(() => {
      this.persistConfig();
    }, 500);
  }

  private FilterAndflatten(query: Query, items: Query[]): void {
    if (!query.isFolder) {
      items.push(query);
    }

    query.children.forEach(subQuery => this.FilterAndflatten(subQuery, items));
  }

  private emitChange(): void {
    this.searchConfigChanged.emit(this._searchConfig);
  }

  private persistConfig(): void {
    this.searchConfigStorage.save(this._searchConfig);
  }

  private async loadQueriesAsync(): Promise<void> {
    const context = this.webContextFactory.create();
    const queries = await this.queryRepo.loadByProjectAsync(context.project.id);
    const flatQueries = new Array<Query>();
    queries.forEach(query => this.FilterAndflatten(query, flatQueries));
    this.queries = flatQueries;
  }
}
