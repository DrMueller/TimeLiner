import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Enquiry, QuestionResult } from '../../model';

@Component({
  selector: 'app-enquiry-dialog',
  templateUrl: './enquiry-dialog.component.html',
  styleUrls: ['./enquiry-dialog.component.scss']
})
export class EnquiryDialogComponent {
  public constructor(
    public dialogRef: MatDialogRef<EnquiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public enquiry: Enquiry
  ) { }

  public noClicked(): void {
    this.dialogRef.close(QuestionResult.No);
  }

  public yesClicked(): void {
    this.dialogRef.close(QuestionResult.Yes);
  }
}
