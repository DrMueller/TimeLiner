import { Component, OnInit } from '@angular/core';
import { VssExtensionContextFactoryService } from 'src/app/core/vss/contexts/extension/services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public versionDescription: string;

  public constructor(private extensionContextFactory: VssExtensionContextFactoryService) { }

  public ngOnInit(): void {
    const extContext = this.extensionContextFactory.create();
    this.versionDescription = `Version: ${extContext.version}`;
  }
}
