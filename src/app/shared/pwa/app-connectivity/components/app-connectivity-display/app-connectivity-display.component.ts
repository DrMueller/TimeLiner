import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConnectivityService } from '../../services';

@Component({
  selector: 'app-app-connectivity-display',
  templateUrl: './app-connectivity-display.component.html',
  styleUrls: ['./app-connectivity-display.component.scss']
})
export class AppConnectivityDisplayComponent {

  public constructor(private appConnectivity: AppConnectivityService) { }

  public get appIsOnline$(): Observable<boolean> {
    return this.appConnectivity.appIsOnline$;
  }
}
