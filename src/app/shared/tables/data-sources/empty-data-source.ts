import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

export class EmptyDataSource<T> extends DataSource<T> {
  public data: T[] = [];

  public connect(): Observable<T[]> {
    return new Observable();
  }

  public disconnect() { }
}
