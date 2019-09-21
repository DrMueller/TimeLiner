import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ErrorInformation } from '../../models';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent {
  public constructor(
    public dialogRef: MatDialogRef<ErrorDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public errorInfo: ErrorInformation) { }

}
