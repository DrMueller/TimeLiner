import { Injectable } from '@angular/core';
import { VssWebContextFactory } from 'src/app/core/vss/contexts/web/services';

@Injectable({
  providedIn: 'root'
})
export class WorkItemUrlFactory {

  constructor(private webContextFactory: VssWebContextFactory) { }

  public createEditUrl(workItemId: number): string {
    const webContext = this.webContextFactory.create();

    const collectionName = webContext.collection.name;
    const projectName = webContext.project.name;

    return `https://${collectionName}.visualstudio.com/${projectName}/_workitems/edit/${workItemId}/`;
  }
}
