import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AboutComponent } from 'src/app/areas/components/about';
import { CalendarComponent } from 'src/app/areas/components/calendar';
import { ConfigComponent } from 'src/app/areas/components/config';
import { OverviewComponent } from 'src/app/areas/components/overview';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';

import { ErrorHandlingModule } from '../error-handling';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    OverviewComponent,
    CalendarComponent,
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
