import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettingsSingletonService } from '../../app-settings/services';

@Injectable({
  providedIn: 'root'
})

export abstract class HttpBaseService {
  public constructor(
    private httpClient: HttpClient,
    private appSettingsSingleton: AppSettingsSingletonService) { }

  public async deleteAsync(relativeUrl: string): Promise<void> {
    const completeUrl = await this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();
    const result = this.processResponse<void>(this.httpClient.delete<void>(completeUrl, requestOptions));

    return result;
  }

  public async getAsync<T>(relativeUrl: string): Promise<T> {
    const completeUrl = await this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();

    return this.processResponse(this.httpClient.get<T>(completeUrl, requestOptions));
  }

  public async postAsync<T>(
    relativeUrl: string,
    body: any): Promise<T> {
    const completeUrl = await this.createCompleteUrl(relativeUrl);

    const requestOptions = this.createOptions();
    return this.processResponse(this.httpClient.post<T>(completeUrl, body, requestOptions));
  }

  public async putAsync<T>(
    relativeUrl: string,
    body: any): Promise<T> {
    const completeUrl = await this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();
    return this.processResponse(this.httpClient.put<T>(completeUrl, body, requestOptions));
  }

  protected abstract getResourceUrl(): string;

  private createCompleteUrl(relativeUrl: string): string {
    let result = this.appSettingsSingleton.instance.serverBaseUrl;
    result = result + this.getResourceUrl() + '/';
    result += relativeUrl;
    return result;
  }

  private createOptions(): object {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: headers
    };

    return httpOptions;
  }

  private processResponse<T>(response: Observable<T>): Promise<T> {
    const result = response.toPromise();
    return result;
  }
}
