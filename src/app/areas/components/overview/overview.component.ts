import { Component, OnInit } from '@angular/core';
import { VssExtensionContextFactory } from 'src/app/core/vss/contexts/extension/services';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private extContextFactory: VssExtensionContextFactory) { }

  ngOnInit() {
    const context = this.extContextFactory.create();
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(context);
  }

}
