import { Injectable } from '@angular/core';
import { CommonMethods4To5 } from 'TFS/WorkItemTracking/RestClient';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAllAsync(dateFieldName: string): WorkItem[] {
    VSS.require(['VSS/Service', 'TFS/WorkItemTracking/RestClient'], async (VSS_Service: any, TFS_Wit_WebApi: any) => {
      // tslint:disable-next-line: no-debugger
      debugger;
      const witClient = <CommonMethods4To5>VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
      const tra = await witClient.getWorkItems([424, 1074]);
      return tra;
    });

    console.log(dateFieldName);

    return [
      new WorkItem(1, 'title  1', new Date(Date.now())),
      new WorkItem(2, 'title  2', new Date(Date.now())),
      new WorkItem(3, 'title  3', new Date(Date.now()))
    ];
  }
}
