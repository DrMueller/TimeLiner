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
      VSS.require(
        ['ReleaseManagement/Core/RestClient',
          'ReleaseManagement/Core/Contracts'], (TFS_RM_RestClient: any, contracts: any) => {
            try {
              const tra = TFS_RM_RestClient.getClient()
                .getReleaseDefinitions(
                  1,
                  null,
                  contracts.ReleaseDefinitionExpands.Environments);

              console.log(tra);

              // tslint:disable-next-line: no-debugger
              resolve([]);
              // tslint:disable-next-line: no-debugger
              debugger;
              // tslint:disable-next-line: no-debugger
            } catch (er) {
              console.log(er);
            }
          });

      VSS.require(['TFS/WorkItemTracking/RestClient'], (restClientWi: any) => {
        try {
          // tslint:disable-next-line: no-debugger
          debugger;
          const witClient = restClientWi.getClient();
          witClient.getWorkItem(424).then((wi: any) => {
            // tslint:disable-next-line: no-debugger
            debugger;
            console.log(wi);
            // const workItems = wi.map(nw => new WorkItem(nw.id, nw.fields['title'], nw.fields['date']));
            // resolve(workItems);
          });
          // tslint:disable-next-line: no-debugger

        } catch (er) {
          // tslint:disable-next-line: no-debugger
          debugger;
          console.log(er);
        }
      });

      // VSS.require(['VSS/Service', 'TFS/WorkItemTracking/RestClient'], async (VSS_Service: any, TFS_Wit_WebApi: any) => {
      //   try {
      //     const witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
      //     witClient.getWorkItem(424, 1074).then((wi: any) => {
      //       // tslint:disable-next-line: no-debugger
      //       debugger;
      //       console.log(wi);
      //       // const workItems = wi.map(nw => new WorkItem(nw.id, nw.fields['title'], nw.fields['date']));
      //       // resolve(workItems);
      //     });
      //     // tslint:disable-next-line: no-debugger

      //   } catch (er) {
      //     // tslint:disable-next-line: no-debugger
      //     debugger;
      //     console.log(er);
      //   }
      // });




      console.log(dateFieldName);
      // return [
      //   new WorkItem(1, 'title  1', new Date(Date.now())),
      //   new WorkItem(2, 'title  2', new Date(Date.now())),
      //   new WorkItem(3, 'title  3', new Date(Date.now()))
      // ];
    });
  }
}
