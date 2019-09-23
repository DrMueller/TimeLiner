import { Injectable } from '@angular/core';

import { VssContext, VssProject, VssUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VssContextFactory {

  constructor() { }

  public create(): VssContext {
    const nativeContext = VSS.getWebContext();
    return new VssContext(
      this.createVssProject(nativeContext),
      this.createVssUser(nativeContext)
    );
  }

  private createVssUser(nativeContext: WebContext): VssUser {
    return new VssUser(
      nativeContext.user.id,
      nativeContext.user.name);
  }

  private createVssProject(nativeContext: WebContext): VssProject {
    return new VssProject(
      nativeContext.project.id,
      nativeContext.project.name);
  }
}
