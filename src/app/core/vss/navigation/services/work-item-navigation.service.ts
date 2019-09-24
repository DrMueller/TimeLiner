import { Injectable } from '@angular/core';

import { VssWebContextFactory } from '../../contexts/web/services';

@Injectable({
  providedIn: 'root'
})
export class WorkItemNavigationService {
  public constructor(private webContextFactory: VssWebContextFactory) { }

  public navigateToEdit(workItemId: number): void {
    const url = this.createEditUrl(workItemId);
    window.open(url);
  }

  private createEditUrl(workItemId: number): string {
    const webContext = this.webContextFactory.create();

    const collectionName = webContext.collection.name;
    const projectName = webContext.project.name;

    return `https://${collectionName}.visualstudio.com/${projectName}/_workitems/edit/${workItemId}/`;
  }
}
