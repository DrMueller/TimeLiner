import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatDependenciesModule } from '../../mat-deps';

import { EnquiryDialogComponent } from './components/enquiry-dialog';
import { EnquiryService } from './services';

@NgModule({
  declarations: [
    EnquiryDialogComponent
  ],
  entryComponents: [
    EnquiryDialogComponent
  ],
  providers: [
    EnquiryService
  ],
  imports: [
    CommonModule,
    MatDependenciesModule,
    TranslateModule
  ]
})
export class EnquiryDialogModule { }
