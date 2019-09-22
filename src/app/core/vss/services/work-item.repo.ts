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
        'TFS/Dashboards/WidgetHelpers',
        'TFS/Build/RestClient',
        'TFS/Build/Contracts',
        'ReleaseManagement/Core/RestClient',
        'ReleaseManagement/Core/Contracts'],
        function (WidgetHelpers: any, TFS_Build_RestClient: any, TFS_Build_Contracts: any, TFS_RM_RestClient: any, TFS_RM_Contracts: any) {
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
          console.log(WidgetHelpers);
          console.log(TFS_Build_RestClient);
          console.log(TFS_Build_Contracts);
        });

      console.log(dateFieldName);
      resolve([]);
    });


  }
}
