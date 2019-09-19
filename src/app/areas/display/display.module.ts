import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDependenciesModule } from 'src/app/mat-deps';

import { OverviewComponent } from './components/overview';

@NgModule({
  declarations: [OverviewComponent],
  exports: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MatDependenciesModule,
    FullCalendarModule
  ]
})
export class DisplayModule { }
