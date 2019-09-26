import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { LocalStorageService } from 'src/app/core/storage/services';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { Query } from 'src/app/core/vss/data/queries/models';
import { QueryRepo } from 'src/app/core/vss/data/queries/query.repo';

interface INode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  public treeControl = new FlatTreeControl<INode>(
    node => node.level,
    node => node.expandable);

  public treeFlattener = new MatTreeFlattener(
    this.adaptQuery,
    node => node.level,
    node => node.expandable,
    node => node.children);

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private _selectedQueryId: string;
  private readonly _queryFieldKey = 'QueryFieldKey';

  public constructor(
    private contextFactory: VssWebContextFactory,
    private localStorage: LocalStorageService,
    private queryRepo: QueryRepo) { }

  public async ngOnInit(): Promise<void> {
    const context = this.contextFactory.create();
    const queries = await this.queryRepo.loadByProjectAsync(context.project.id);
    // const flatQueries = new Array<Query>();
    // queries.forEach(query => this.flatten(query, flatQueries));
    this.selectedQueryId = this.localStorage.load(this._queryFieldKey) || '';
    this.dataSource.data = queries;
  }


  public hasChild(query: Query): boolean {
    // tslint:disable-next-line: no-debugger
    debugger;
    return query.children && query.children.length > 0;
  }

  private flatten(query: Query, items: Query[]): void {
    items.push(query);
    query.children.forEach(subQuery => this.flatten(subQuery, items));
  }

  private adaptQuery(query: Query, level: number): INode {
    return {
      expandable: !!query.children && query.children.length > 0,
      name: query.name,
      level: level,
    };
  }
}
