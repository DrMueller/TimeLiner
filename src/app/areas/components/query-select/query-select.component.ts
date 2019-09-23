import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { Query } from 'src/app/core/vss/data/queries/models';
import { QueryRepo } from 'src/app/core/vss/data/queries/query.repo';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  public get selectedQuery(): Query {
    return this._selectedQuery;
  }

  public set selectedQuery(value: Query) {
    this._selectedQuery = value;
    this.selectedQueryChanged.emit(value);
  }

  @Output() public selectedQueryChanged = new EventEmitter<Query>();

  public queries: Query[];
  private _selectedQuery: Query;

  public constructor(
    private contextFactory: VssWebContextFactory,
    private queryRepo: QueryRepo) { }

  public ngOnInit() {
    const context = this.contextFactory.create();
    this.queryRepo.loadByProjectAsync(context.project.id).then(queries => this.queries = queries);
  }
}
