import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/storage/services';
import { VssWebContextFactoryService } from 'src/app/core/vss/contexts/web/services';

import { SearchConfigurationDto } from '../dtos';


@Injectable({
  providedIn: 'root'
})
export class SearchConfigurationStorageService {

  public constructor(
    private webContextFactory: VssWebContextFactoryService,
    private localStorage: LocalStorageService) { }

  public load(): SearchConfigurationDto {
    const loadedDto = this.localStorage.load<SearchConfigurationDto>(this.createKey());
    if (loadedDto) {
      return loadedDto;
    }

    return new SearchConfigurationDto('', '');
  }

  public save(dto: SearchConfigurationDto): void {
    this.localStorage.save(this.createKey(), dto);
  }

  private createKey(): string {
    const projectId = this.webContextFactory.create().project.id;
    const key = `searchconfig_${projectId}`;
    return key;
  }
}
