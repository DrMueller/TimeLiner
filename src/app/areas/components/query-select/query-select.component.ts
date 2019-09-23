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
    // tslint:disable-next-line: no-debugger
    debugger;
    this._selectedQuery = value;
    this.selectedQueryChanged.emit(value);
  }

  @Output() public selectedQueryChanged = new EventEmitter<Query>();

  public queries: Query[];
  private _selectedQuery: Query;

  public constructor(
    private contextFactory: VssWebContextFactory,
    private queryRepo: QueryRepo) { }

  public async ngOnInit(): Promise<void> {
    const context = this.contextFactory.create();
    const queries = await this.queryRepo.loadByProjectAsync(context.project.id);
    // tslint:disable-next-line: no-debugger
    debugger;
    this.queries = ([] as Query[]).concat(...queries);
  }
}
