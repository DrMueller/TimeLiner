import { Injectable } from '@angular/core';
import { WorkItemRepo } from 'src/app/core/vss/data/work-items/repos';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  public constructor(private workItemRepo: WorkItemRepo) { }

  public async updateWorkItemWithNewDateAsync(workItemId: number, dateFieldName: string, date: Date): Promise<void> {
    const workItem = await this.workItemRepo.loadByIdAsync(workItemId);
    workItem.updateField(dateFieldName, date);
    await this.workItemRepo.updateAsync(workItem);
  }
}
