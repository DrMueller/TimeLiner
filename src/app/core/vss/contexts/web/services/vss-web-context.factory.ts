import { Injectable } from '@angular/core';

import { VssProject, VssUser, VssWebContext } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VssWebContextFactory {
  public create(): VssWebContext {
    const nativeContext = VSS.getWebContext();
    // tslint:disable-next-line: no-debugger
    debugger;
    const col = nativeContext.collection;
    const tra = nativeContext.account;

    console.log(col);
    console.log(tra);

    return new VssWebContext(
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
