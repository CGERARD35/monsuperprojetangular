import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipeMock} from './translate.pipe.mock';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from './translate-loader.mock';
import {translateServiceMock} from './translate.service.mock';

@NgModule({
  declarations: [TranslatePipeMock],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
    }),
  ],
  exports: [
    TranslatePipeMock
  ],
  providers: [
    {provide: TranslateService, useValue: translateServiceMock},
  ]
})
export class NgxTranslateTestingModule {
}
