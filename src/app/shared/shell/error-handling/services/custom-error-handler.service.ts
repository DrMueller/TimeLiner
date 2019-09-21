import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { ErrorDisplayComponent } from '../components/error-display/error-display.component';
import { ErrorInformation } from '../models';

import { ErrorInformationFactoryService } from './error-information-factory.service';
import { ErrorUnwrappingService } from './error-unwrapping.service';
import { IgnoredErrorsService } from './ignored-errors.service';

@Injectable()
export class CustomErrorHandlerService extends ErrorHandler {
  private _previousError: any;

  public constructor(
    private errorUnwrappingService: ErrorUnwrappingService,
    private ignoredErrorsService: IgnoredErrorsService,
    private errorInformationFactory: ErrorInformationFactoryService,
    private dialog: MatDialog,
    private ngZone: NgZone) {
      super();
  }

  public handleError(error: any): void {
    if (this.checkIsSameAsPreviousError(error)) {
      return;
    }

    this._previousError = error;
    const unpackedError = this.errorUnwrappingService.unwrapError(error);
    console.log(unpackedError);

    if (this.ignoredErrorsService.isIgnoredError(unpackedError)) {
      return;
    }

    const errorInformation = this.errorInformationFactory.createFromError(unpackedError);
    this.showErrorDialog(errorInformation);
  }

  private showErrorDialog(errorInformation: ErrorInformation): void {
    const config = new MatDialogConfig();
    config.data = errorInformation;
    config.disableClose = true;

    this.ngZone.run(() => {
      this.dialog.open(ErrorDisplayComponent, config);
    });
  }

  private checkIsSameAsPreviousError(error: any): boolean {
    return this._previousError && error.stack === this._previousError.stack && error.message === this._previousError.message;
  }
}
