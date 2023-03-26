import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./modules/core/components/page-not-found/page-not-found.component";
import { APP_PATHS } from "./modules/shared/models/app-paths.model";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/track-team/track-team.module').then(m => m.TrackTeamModule)
  },
  {
    path: APP_PATHS.RESULTS + '/:teamCode',
    loadChildren: () => import('./modules/results/results.module').then(m => m.ResultsModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
