import { Injectable } from '@angular/core';
import * as nat from 'TFS/WorkItemTracking/Contracts';

import { WorkItemType } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemTypeAdapter {
  public adapt(nativeType: nat.WorkItemType): WorkItemType {
    return new WorkItemType(nativeType.name, nativeType.color);
  }
}
