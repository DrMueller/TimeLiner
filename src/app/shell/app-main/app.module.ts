import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import CalendarComponent from '@fullcalendar/core/CalendarComponent';
import { ConfigComponent } from 'src/app/areas/components/config';
import { OverviewComponent } from 'src/app/areas/components/overview';
import { QuerySelectComponent } from 'src/app/areas/components/query-select';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';

import { ErrorHandlingModule } from '../error-handling';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CalendarComponent,
    QuerySelectComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyIndicationModule,
    ErrorHandlingModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatDependenciesModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
