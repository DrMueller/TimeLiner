import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe((_: Event) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  public async getAndInitTranslations(): Promise<void> {
    const firstPage = this.translateService.get('shared.tables.services.firstPage').toPromise();
    const itemsPerPage = this.translateService.get('shared.tables.services.itemsPerPage').toPromise();
    const lastPage = this.translateService.get('shared.tables.services.lastPage').toPromise();
    const nextPage = this.translateService.get('shared.tables.services.nextPage').toPromise();
    const previousPage = this.translateService.get('shared.tables.services.previousPage').toPromise();

    const values = await Promise.all([
      firstPage,
      itemsPerPage,
      lastPage,
      nextPage,
      previousPage]);

    this.firstPageLabel = values[0];
    this.itemsPerPageLabel = values[1];
    this.lastPageLabel = values[2];
    this.nextPageLabel = values[3];
    this.previousPageLabel = values[4];
    this.changes.next();
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
