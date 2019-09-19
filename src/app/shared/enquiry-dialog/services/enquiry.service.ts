import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EnquiryDialogComponent } from '../components/enquiry-dialog';
import { Enquiry, QuestionResult } from '../model';

@Injectable()
export class EnquiryService {
  public constructor(private dialog: MatDialog) { }

  public ask(enquiry: Enquiry): Observable<QuestionResult> {
    const config = new MatDialogConfig();
    config.data = enquiry;
    config.disableClose = true;

    const dialogRef = this.dialog.open(EnquiryDialogComponent, config);
    return dialogRef.afterClosed().pipe(map(val => <QuestionResult>val));
  }
}
