import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableTemplateBaseComponent } from '../table-base-template';

@Component({
  selector: 'app-button-template',
  templateUrl: './button-template.component.html',
  styleUrls: ['./button-template.component.scss']
})
export class ButtonTemplateComponent extends TableTemplateBaseComponent {

  @Output() public buttonClick: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
  @Input() public materialColor: string;
  @Input() public materialIcon: string;

  public click(event: any): void {
    const rowId = super.tryFetchingRowId(event);
    this.buttonClick.emit(rowId);
  }
}
