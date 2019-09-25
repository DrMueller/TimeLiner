import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items/repos';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  constructor(private workItemRepo: WorkItemRepo) { }

  public async updateWorkItemWithNewDateAsync(workItemId: number, dateFieldName: string, date: Date): Promise<void> {
    const workItem = await this.workItemRepo.loadByIdAsync(workItemId);
    workItem.updateField(dateFieldName, date);

    // tslint:disable-next-line: no-debugger
    debugger;
    await this.workItemRepo.updateAsync(workItem);
  }
}
