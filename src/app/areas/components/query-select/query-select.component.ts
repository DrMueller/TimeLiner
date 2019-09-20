import { Component, OnInit } from '@angular/core';

import { Query } from '../../models';
import { QueryRepo } from '../../repos/query.repo';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  public selectedQuery: Query;

  public queries: Query[];

  public constructor(private queryRepo: QueryRepo) { }

  public ngOnInit() {
    this.queryRepo.loadAllQueries().then(queries => this.queries = queries);
  }
}
