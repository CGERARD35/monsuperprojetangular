import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MockToolbarComponent} from "./core/components/toolbar/__mocks__/toolbar.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockToolbarComponent
      ],
    }).compileComponents();
  });

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Init test', () => {
    test('should create the app', () => {
      expect(component).toBeTruthy();
    });
  });
});
