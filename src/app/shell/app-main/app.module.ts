import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';
import { RxFormsModule } from 'src/app/shared/rx-forms';
import { TablesModule } from 'src/app/shared/tables';

import { LocalizationModule } from '../../core/localization/localization.module';
import { ErrorHandlingModule } from '../error-handling';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyIndicationModule,
    ErrorHandlingModule.forRoot(),
    HttpClientModule,
    LocalizationModule,
    MatDependenciesModule.forRoot(),
    RxFormsModule.forRoot(),
    TablesModule.forRoot()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
