import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { SnackBarConfiguration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private snackBar: MatSnackBar) { }

  public showSnackBar(
    text: string,
    snackBackConfig?: SnackBarConfiguration): void {
    const checkedConfig = snackBackConfig || SnackBarConfiguration.createDefault();

    setTimeout(() => {
      this.snackBar.open(text, undefined, <MatSnackBarConfig<any>>{
        duration: checkedConfig.displayDurationInSeconds * 1000,
      });
    });
  }
}
