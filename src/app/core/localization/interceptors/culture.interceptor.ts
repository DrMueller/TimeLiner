import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class CultureInterceptor implements HttpInterceptor {
  public constructor(private translator: TranslateService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLanguage = this.translator.currentLang;

    if (currentLanguage) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': currentLanguage
        }
      });

    }

    return next.handle(request);
  }
}
