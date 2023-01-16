import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {NgxTranslateTestingModule} from "../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module";
import {MatSelectModule} from "@angular/material/select";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterTestingModule} from "@angular/router/testing";

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        NgxTranslateTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Typescript test', () => {
    test('should use the lang', () => {
      component.selectLang('fr');
      expect(component[`translateService`].use).toHaveBeenNthCalledWith(1, 'fr');
    });
  });
});
