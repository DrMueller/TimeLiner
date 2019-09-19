import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConnectivityService {
  private _appIsOnline: BehaviorSubject<boolean>;

  public initialize(): void {
    this._appIsOnline = new BehaviorSubject(window.navigator.onLine);
    window.addEventListener('online', () => this.publishConnectivity());
    window.addEventListener('offline', () => this.publishConnectivity());
  }

  public get appIsOnline$(): Observable<boolean> {
    return this._appIsOnline;
  }

  private publishConnectivity(): void {
    this._appIsOnline.next(window.navigator.onLine);
  }
}
