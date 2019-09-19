import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyIndicatorService {
  private _showBusyIndicator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get showBusyIndicator$(): Observable<boolean> {
    return this._showBusyIndicator;
  }

  public async withBusyIndicator<T>(callback: () => Promise<T>): Promise<T> {
    try {
      setTimeout(() => this._showBusyIndicator.next(true));
      return await callback();
    } finally {
      setTimeout(() => this._showBusyIndicator.next(false));
    }
  }
}
