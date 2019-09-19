import { Injectable } from '@angular/core';

import { WorkItem } from '../models';

@Injectable({
  providedIn: 'root'
})

export class WorkItemRepo {
  public loadAll(dateFieldName: string): WorkItem[] {
    // VSS.require(['VSS/Service', 'TFS/WorkItemTracking/RestClient'], function (VSS_Service: any, TFS_Wit_WebApi: any) {
    //   const witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
    // });

    console.log(dateFieldName);

    return [
      new WorkItem(1, 'title  1', new Date(Date.now())),
      new WorkItem(2, 'title  2', new Date(Date.now())),
      new WorkItem(3, 'title  3', new Date(Date.now()))
    ];
  }
}
