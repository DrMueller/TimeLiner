import { Injectable } from '@angular/core';

import { Query } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QueryRepo {
  public loadAllQueries(): Promise<Query[]> {
    const mock = [
      new Query(1, 'test 1'),
      new Query(2, 'test 2'),
      new Query(3, 'test 3')
    ];

    return Promise.resolve(mock);

  }
}
