import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ValidationErrorsDirective } from './directives/validation-errors.directive';
import { VALIDATION_ERROR_MAPPER_TOKEN } from './services/validation/constants';
import { MaxLengthErrorMapperService } from './services/validation/implementation/max-length-error-mapper.service';
import { MinLengthErrorMapperService } from './services/validation/implementation/min-length-error-mapper.service';
import { RequiredErrorMapperService } from './services/validation/implementation/required-error-mapper.service';

@NgModule({
  declarations: [
    ValidationErrorsDirective
  ],
  exports: [
    ReactiveFormsModule,
    ValidationErrorsDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RxFormsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RxFormsModule,
      providers: [
        {
          provide: VALIDATION_ERROR_MAPPER_TOKEN,
          multi: true,
          useClass: MinLengthErrorMapperService
        },
        {
          provide: VALIDATION_ERROR_MAPPER_TOKEN,
          multi: true,
          useClass: RequiredErrorMapperService
        },
        {
          provide: VALIDATION_ERROR_MAPPER_TOKEN,
          multi: true,
          useClass: MaxLengthErrorMapperService
        }
      ]
    };
  }
}
