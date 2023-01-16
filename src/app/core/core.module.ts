import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forChild(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressBarModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    ToolbarComponent
  ]
})
export class CoreModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.use('fr');
  }
}
