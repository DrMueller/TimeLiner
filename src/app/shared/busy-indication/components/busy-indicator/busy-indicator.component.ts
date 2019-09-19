import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss'],
  animations: [
    trigger('fadeInOut',
      [
        state('*', style(
          {
            opacity: 0,
            display: 'none'
          })),
        state('1', style(
          {
            opacity: 100,
            display: 'inline-block'
          })),
        transition('1 => *', animate('1000ms ease-out'))
      ])
  ]
})
export class BusyIndicatorComponent {
  public showIndicator: boolean;
}
