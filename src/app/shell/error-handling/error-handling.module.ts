import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatDependenciesModule } from '../../mat-deps';

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
    MatDependenciesModule,
    TranslateModule
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
