import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/services';
import { VssWebContextFactoryService } from 'src/app/core/vss/contexts/web/services';
import { QueryRepositoryService } from 'src/app/core/vss/data/queries';
import { Query } from 'src/app/core/vss/data/queries/models';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  public get selectedQueryId(): string {
    return this._selectedQueryId;
  }

  public set selectedQueryId(value: string) {
    this._selectedQueryId = value;
    this.selectedQueryIdChanged.emit(value);
    this.localStorage.save(this._queryFieldKey, value);
  }

  @Output() public selectedQueryIdChanged = new EventEmitter<string>();

  public queries: Query[];
  private _selectedQueryId: string;
  private readonly _queryFieldKey = 'QueryFieldKey';

  public constructor(
    private webContextFactory: VssWebContextFactoryService,
    private localStorage: LocalStorageService,
    private queryRepo: QueryRepositoryService) { }

  public async ngOnInit(): Promise<void> {
    const context = this.webContextFactory.create();
    const queries = await this.queryRepo.loadByProjectAsync(context.project.id);
    const flatQueries = new Array<Query>();
    queries.forEach(query => this.FilterAndflatten(query, flatQueries));
    this.queries = flatQueries;
    this.selectedQueryId = this.localStorage.load(this._queryFieldKey) || '';
  }

  private FilterAndflatten(query: Query, items: Query[]): void {
    if (!query.isFolder) {
      items.push(query);
    }

    query.children.forEach(subQuery => this.FilterAndflatten(subQuery, items));
  }
}
