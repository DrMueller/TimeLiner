import { Injectable } from '@angular/core';

import { InstallPwaPromptService } from './install-pwa-prompt.service';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallationService {
  public constructor(private installPwaPromptService: InstallPwaPromptService) { }

  public get canInstallAsPwa(): boolean {
    return !!this.installPwaPromptService.event;
  }

  public installAsPwa(): void {
    this.installPwaPromptService.event.prompt();
  }
}
