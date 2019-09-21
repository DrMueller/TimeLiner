import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../../mat-deps';

import { ErrorDisplayComponent } from './components/error-display';
import { CustomErrorHandlerService } from './services';

@NgModule({
  declarations: [
    ErrorDisplayComponent
  ],
  entryComponents: [
    ErrorDisplayComponent
  ],
  imports: [
    CommonModule,
    MatDependenciesModule
  ]
})
export class ErrorHandlingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        { provide: ErrorHandler, useClass: CustomErrorHandlerService }
      ]
    };
  }
}
