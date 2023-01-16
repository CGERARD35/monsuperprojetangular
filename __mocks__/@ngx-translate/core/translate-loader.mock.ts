import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

const translations: any = {};

export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}
