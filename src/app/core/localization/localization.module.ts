import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CultureInterceptor } from './interceptors';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CultureInterceptor,
      multi: true
    }
  ]
})
export class LocalizationModule { }
