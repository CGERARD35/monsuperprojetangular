import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
}, {
  path: 'test', loadChildren: () => import('./test-lazy-loading/test-lazy-loading.module').then(m => m.TestLazyLoadingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: NoPreloading
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
