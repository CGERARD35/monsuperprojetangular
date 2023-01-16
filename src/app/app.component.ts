import {Component} from '@angular/core';
import {LoaderService} from "./core/services/loader.service";

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
