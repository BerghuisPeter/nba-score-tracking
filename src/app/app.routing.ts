import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./modules/core/components/page-not-found/page-not-found.component";
import { APP_PATHS } from "./modules/shared/models/app-paths.model";
import { GetTeamsResolver } from "./modules/core/resolvers/get-teams.resolver";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/track-team/track-team.module').then(m => m.TrackTeamModule),
    resolve: { teams: GetTeamsResolver }
  },
  {
    path: APP_PATHS.RESULTS + '/:teamCode',
    loadChildren: () => import('./modules/results/results.module').then(m => m.ResultsModule),
    resolve: { teams: GetTeamsResolver }
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
