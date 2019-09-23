import { Component, OnInit } from '@angular/core';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services/vss-web-context.factory';
import { Query } from 'src/app/core/vss/data/queries/models';
import { QueryRepo } from 'src/app/core/vss/data/queries/query.repo';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  public selectedQuery: Query;

  public queries: Query[];

  public constructor(
    private contextFactory: VssWebContextFactory,
    private queryRepo: QueryRepo) { }

  public ngOnInit() {
    const context = this.contextFactory.create();
    this.queryRepo.loadByProjectAsync(context.project.id).then(queries => this.queries = queries);
  }
}
