/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />.
/// <reference path="../../../../../node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />.

import { Injectable } from '@angular/core';
import { CommonMethods4To5 } from 'TFS/WorkItemTracking/RestClient';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): Promise<WorkItem[]> {
    return new Promise((resolve: (value?: WorkItem[]) => void, _: any) => {

      VSS.require(
        ['ReleaseManagement/Core/RestClient',
          'ReleaseManagement/Core/Contracts'], (TFS_RM_RestClient: any, contracts: any) => {
            try {
              const tra = TFS_RM_RestClient.getClient()
                .getReleaseDefinitions(
                  1,
                  null,
                  contracts.ReleaseDefinitionExpands.Environments);

              // tslint:disable-next-line: no-debugger
              debugger;
              console.log(tra);
              // tslint:disable-next-line: no-debugger
            } catch (er) {
              debugger;
              console.log(er);
            }
          });

      VSS.require(['VSS/Service', 'TFS/WorkItemTracking/RestClient'], async (VSS_Service: any, TFS_Wit_WebApi: any) => {
        try {
          const witClient = <CommonMethods4To5>VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
          witClient.getWorkItems([424, 1074]).then(wis => {
            // tslint:disable-next-line: no-debugger
            debugger;
            const workItems = wis.map(nw => new WorkItem(nw.id, nw.fields['title'], nw.fields['date']));
            resolve(workItems);
          });
          // tslint:disable-next-line: no-debugger

        } catch (er) {
          // tslint:disable-next-line: no-debugger
          debugger;
          console.log(er);
        }

      });

      console.log(dateFieldName);
      // return [
      //   new WorkItem(1, 'title  1', new Date(Date.now())),
      //   new WorkItem(2, 'title  2', new Date(Date.now())),
      //   new WorkItem(3, 'title  3', new Date(Date.now()))
      // ];
    });
  }
}
