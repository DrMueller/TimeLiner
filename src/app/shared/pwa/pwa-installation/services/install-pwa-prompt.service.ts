import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class InstallPwaPromptService {
  private _event: any | null = null;

  public constructor(private swUpdate: SwUpdate) {
    console.log('listening for beforeinstallprompt..');
    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallprompt received');
      this._event = event;
    });
  }

  public get event(): any {
    return this._event;
  }

  public registerUpdateAvaliableCallback(): void {
    this.swUpdate.available.subscribe(_ => {
      if (confirm('Update App?')) {
        window.location.reload();
      }
    });
  }
}
