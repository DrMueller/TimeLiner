import { Component, OnInit } from '@angular/core';
import { VssContextFactory } from 'src/app/core/vss/context/services/vss-context.factory';
import { Query } from 'src/app/core/vss/data/models';
import { QueryRepo } from 'src/app/core/vss/data/query.repo';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  public selectedQuery: Query;

  public queries: Query[];

  public constructor(
    private contextFactory: VssContextFactory,
    private queryRepo: QueryRepo) { }

  public ngOnInit() {
    const context = this.contextFactory.create();
    // tslint:disable-next-line: no-debugger
    debugger;
    this.queryRepo.loadByProjectAsync(context.project.id).then(queries => this.queries = queries);
  }
}
