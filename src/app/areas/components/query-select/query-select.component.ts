import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/services';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { Query } from 'src/app/core/vss/data/queries/models';
import { QueryRepo } from 'src/app/core/vss/data/queries/query.repo';

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
    private contextFactory: VssWebContextFactory,
    private localStorage: LocalStorageService,
    private queryRepo: QueryRepo) { }

  public async ngOnInit(): Promise<void> {
    const context = this.contextFactory.create();
    const queries = await this.queryRepo.loadByProjectAsync(context.project.id);
    const flatQueries = new Array<Query>();
    queries.forEach(query => this.flatten(query, flatQueries));
    this.queries = flatQueries;
    this.selectedQueryId = this.localStorage.load(this._queryFieldKey) || '';
  }

  private flatten(query: Query, items: Query[]): void {
    items.push(query);
    query.children.forEach(subQuery => this.flatten(subQuery, items));
  }
}
