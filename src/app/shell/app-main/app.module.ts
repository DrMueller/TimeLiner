import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from 'src/app/areas/components/calendar';
import { OverviewComponent } from 'src/app/areas/components/overview';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';

import { ErrorHandlingModule } from '../error-handling';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyIndicationModule,
    ErrorHandlingModule.forRoot(),
    HttpClientModule,
    FullCalendarModule,
    MatDependenciesModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
