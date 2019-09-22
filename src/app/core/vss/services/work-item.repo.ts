/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): Promise<WorkItem[]> {
    return new Promise((resolve: (value?: WorkItem[]) => void, _: any) => {
      VSS.require([
        'ReleaseManagement/Core/RestClient',
        'ReleaseManagement/Core/Contracts'],
        function (TFS_RM_RestClient: any, TFS_RM_Contracts: any) {
          // Get the id of the current project
          // tslint:disable-next-line: no-debugger
          debugger;
          const projectId = VSS.getWebContext().project.id;

          const tra = TFS_RM_RestClient.getClient()
            .getReleaseDefinitions(
              projectId,
              null,
              TFS_RM_Contracts.ReleaseDefinitionExpands.Environments);

          // tslint:disable-next-line: no-debugger
          debugger;
          console.log(tra);
        });

      console.log(dateFieldName);
      resolve([]);
    });


  }
}
