import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../mat-deps';

import { AppConnectivityDisplayComponent } from './app-connectivity/components/app-connectivity-display';

@NgModule({
  declarations: [
    AppConnectivityDisplayComponent
  ],
  exports: [
    AppConnectivityDisplayComponent
  ],
  imports: [
    CommonModule,
    MatDependenciesModule
  ]
})
export class PwaModule { }
