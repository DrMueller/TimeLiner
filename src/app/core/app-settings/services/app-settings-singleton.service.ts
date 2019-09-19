import { Injectable } from '@angular/core';

import { AppSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsSingletonService {

  public get instance(): AppSettings {
    return this._appSettings;
  }

  private _appSettings: AppSettings;

  public async initializeAsync(): Promise<void> {
    const appSettings = await fetch('./app-settings/appsettings.json');
    const data = <AppSettings>await appSettings.json();

    this._appSettings = data;
  }
}
