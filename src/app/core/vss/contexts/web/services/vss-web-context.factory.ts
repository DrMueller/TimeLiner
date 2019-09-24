import { Injectable } from '@angular/core';

import { VssCollection, VssProject, VssUser, VssWebContext } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VssWebContextFactory {
  public create(): VssWebContext {
    const nativeContext = VSS.getWebContext();

    return new VssWebContext(
      this.createVssCollection(nativeContext),
      this.createVssProject(nativeContext),
      this.createVssUser(nativeContext)
    );
  }

  private createVssCollection(nativeContext: WebContext): VssCollection {
    return new VssCollection(
      nativeContext.collection.id,
      nativeContext.collection.name);
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
