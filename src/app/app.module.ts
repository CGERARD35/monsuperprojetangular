import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CoreModule} from "./core/core.module";
import {TodosModule} from "./todos/todos.module";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {GroupsModule} from "./groups/groups.module";

export function HttpLoaderFactory(http: HttpClient) {
  console.error('test')
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    GroupsModule,
    TodosModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
